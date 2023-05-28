import React, { useEffect, useState } from 'react';
import axios from "axios";
import ROUTER from '../../../network/Router'
import PageCss from "../../../styles/PreferencePg.module.css";
import { getSemesterModelConfig, getGenericAuthModelConfig, getParameterDataModelConfig } from '../../../network/RequestTemplates';
import DropDownSquareGroup from '../../PgComponents/DropDownSquaresPreference/DDPreferenceSquareGroup';
const FacultyPreferencePg = () => {
    const [selectedSemesterId, setSelectedSemesterId] = useState("0");
    const [disableDropDown, setDisableDropDown] = useState(true);
    const [semesterList, setSemesterList] = useState([]);
    const [selectedGroupClassOption, setSelectedGroupClassOption] = useState(0);
    const [selectedNumOfDays, setSelectNumOfDays] = useState(5);

    //used to keep track of submitted option preferences
    const [teachingId, setTeachingId] = useState(null);
    const [teachingParameter, setTeachingParameter] = useState(null);
    const [teachingDays, setTeachingDays] = useState(0);
    const [backToBackParameter, setBackToBackParameter] = useState(null);
    const [backToBackScore, setBackToBackScore] = useState(0);

    //routes to fetch data
    const getPreferenceData = ROUTER.api.getPreferenceData;
    const timeParam = ROUTER.api.userTimeParam;
    const getPreferenceIds = ROUTER.api.getPreferenceParameterIds;
    useEffect(() => {
        async function populateSemesterDropDown() {
            await axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
                res => {
                    setSemesterList(res.data)
                    setSelectedSemesterId(res.data[res.data.length - 1].semester_id);
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        }
        populateSemesterDropDown();
    }, []);

    //wait for selectedSemesterId to change before fetching data
    useEffect(() => {
        async function FetchData() {
            if (selectedSemesterId !== "0") {
                setDisableDropDown(false);
                //check if there if user has entries on database (number of days and group class)
                await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': localStorage.getItem('userId') }, {}, localStorage.getItem('token'), ROUTER.api.getUserPreferenceOptionEntries)).then(
                    res => {
                        if (res.data.group.length > 0) {
                            //set the back to back dropdown to the score the user has on the database
                            setSelectedGroupClassOption(res.data.group[0].score);
                            setBackToBackScore(res.data.group[0].score);
                            setBackToBackParameter(res.data.group[0].parameter_id);

                        } else {
                            setSelectedGroupClassOption(0);
                        }
                        if (res.data.teaching.length > 0) {
                            //set the teaching dropdown to the number of days that the user has on the database
                            setTeachingId(res.data.teaching[0].id);
                            setSelectNumOfDays(res.data.teaching[0].num_teaching_days);
                            setTeachingDays(res.data.teaching[0].num_teaching_days);
                            setTeachingParameter(res.data.teaching[0].parameter_id);
                        } else {
                            setSelectNumOfDays(5);
                        }
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                )
            } else {
                //reset dropdowns if user has not selected a semester
                setDisableDropDown(true);
                setSelectNumOfDays(5);
                setSelectedGroupClassOption(0);
            }
        }
        FetchData();
    }, [selectedSemesterId]);

    const submitPreferenceRequest = async (preferenceData, isNewEntry) => {
        let axiosCallListForSelectedSlots = null;
        let userId = localStorage.getItem('userId');
        let lowParameterId = null;
        let mediumParameterId = null;
        let highParameterId = null;
        if (isNewEntry) {
            //create a parameter id for each score if it has at least one yimeblock selected with that score
            for (let x = 0; x < preferenceData.length; x++) {
                for (let y = 0; y < preferenceData[x].timeSlotGroup.length; y++) {
                    if (preferenceData[x].timeSlotGroup[y].currentScore === 1 && lowParameterId === null) {
                        lowParameterId = await makeNewParameterData(1);
                    } else if (preferenceData[x].timeSlotGroup[y].currentScore === 3 && mediumParameterId === null) {
                        mediumParameterId = await makeNewParameterData(3);
                    } else if (preferenceData[x].timeSlotGroup[y].currentScore === 5 && highParameterId === null) {
                        highParameterId = await makeNewParameterData(5);
                    } else if (lowParameterId !== null && mediumParameterId !== null && highParameterId !== null) {
                        break;
                    }
                }
            }
            //save entries on the database
            axiosCallListForSelectedSlots = await returnAxiosCallList(preferenceData, userId, [lowParameterId, mediumParameterId, highParameterId]);
        } else {
            lowParameterId = await getParameterData(1);
            mediumParameterId = await getParameterData(3);
            highParameterId = await getParameterData(5);
            //check if the parameterIds are null, if they are then create new ones
            for (let x = 0; x < preferenceData.length; x++) {
                for (let y = 0; y < preferenceData[x].timeSlotGroup.length; y++) {
                    if (preferenceData[x].timeSlotGroup[y].currentScore === 1 && lowParameterId === null) {
                        lowParameterId = await makeNewParameterData(1);
                    } else if (preferenceData[x].timeSlotGroup[y].currentScore === 3 && mediumParameterId === null) {
                        mediumParameterId = await makeNewParameterData(3);
                    } else if (preferenceData[x].timeSlotGroup[y].currentScore === 5 && highParameterId === null) {
                        highParameterId = await makeNewParameterData(5);
                    } else if (lowParameterId !== null && mediumParameterId !== null && highParameterId !== null) {
                        break;
                    }
                }
            }
            axiosCallListForSelectedSlots = await returnUpdatedAxiosCallList(preferenceData, userId, [lowParameterId, mediumParameterId, highParameterId]);
            //check if any parameterId has no entries in the user_time_parameter table, if not then delete the parameter
            await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': userId }, {}, localStorage.getItem('token'), getPreferenceIds)).then(
                res => {
                    if (res.data.low.length == 0) {
                        deleteParameterId(lowParameterId);
                    }
                    if (res.data.medium.length == 0) {
                        deleteParameterId(mediumParameterId);
                    }
                    if (res.data.high.length == 0) {
                        deleteParameterId(highParameterId);
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }

        //check if teaching parameter table has entries
        if (teachingParameter === null) {
            //parameterId for teachingparameter table
            let parameterNumOfDays = await makeNewParameterData(0);
            //save how many days the user wants to teach on the teaching parameter table
            await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': parameterNumOfDays, 'user_id': userId, 'num_teaching_days': selectedNumOfDays }, localStorage.getItem('token'), ROUTER.api.userTeachingParam))
        } else {
            console.log(teachingParameter);
            if (teachingDays !== selectedNumOfDays) {
                await axios(getGenericAuthModelConfig("PUT", "", { 'id': teachingId, 'parameter_id': teachingParameter, 'user_id': userId, 'num_teaching_days': selectedNumOfDays }, localStorage.getItem('token'), ROUTER.api.userTeachingParam))
            }
        }
        if (backToBackParameter === null) {
            //create parameterId for back to back class
            //the score depends on user selection (0 means no, 1 means I dont care, 2 means yes)
            let backToBackParameterId = await makeNewParameterData(selectedGroupClassOption);
            //save entry on user_back_to_back table
            await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': backToBackParameterId, 'user_id': userId }, localStorage.getItem('token'), ROUTER.api.userBackToBack))
        } else {
            if (backToBackScore !== selectedGroupClassOption) {
                //Update approved status from availability entry
                await axios(getParameterDataModelConfig("PUT", "", { score: selectedGroupClassOption, id: backToBackParameter }, localStorage.getItem('token'))).then(
                    res => {
                        console.log("back to back option updated")
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
            }
        }
        //responses of sent entries
        await axios.all([...axiosCallListForSelectedSlots]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    alert("Your preference specifications have been sent.\n Now Wait for an approval from the admin.")
                } else {
                    alert("Your preference specifications have been updated.\n Now Wait for an approval from the admin.")
                }
            })
        )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });
    }
    const getParameterData = async (score) => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': localStorage.getItem('userId') }, {}, localStorage.getItem('token'), getPreferenceIds)).then(
            res => {
                if (score === 1) {
                    if (res.data.low.length > 0) {
                        Data = res.data.low[0].parameter_id;
                    }

                } else if (score === 3) {
                    if (res.data.medium.length > 0) {
                        Data = res.data.medium[0].parameter_id;
                    }

                } else if (score === 5) {
                    if (res.data.high.length > 0) {
                        Data = res.data.high[0].parameter_id;
                    }
                }
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        return Data;
    }
    const makeNewParameterData = async (score) => {
        let Data = null
        await axios(getParameterDataModelConfig("POST", "", { approved: true, requirement: false, score: score, parameter_id: null, 'semester_id': +selectedSemesterId }, localStorage.getItem('token'))).then(
            res => {
                Data = res.data.parameter_id;
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        return Data;
    }
    const deleteParameterId = async (parameterId) => {
        await axios(getParameterDataModelConfig("DELETE", "", { parameter_id: parameterId }, localStorage.getItem('token'))).then(
            res => {
                console.log(res)
                console.log(parameterId + " deleted")
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }
    const returnAxiosCallList = async (preferenceData, userId, parameterIds) => {
        let axiosCallVarList = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;
        let request = null;
        let paramId = null;

        // for all timeslotes in each weekday
        for (var x = 0; x < preferenceData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslotes in each weekday
            for (var y = 0; y < preferenceData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                //save timeslot depending of score
                if (preferenceData[x].timeSlotGroup[y].currentScore === 5) {
                    paramId = parameterIds[2];
                } else if (preferenceData[x].timeSlotGroup[y].currentScore === 3) {
                    paramId = parameterIds[1];
                } else {
                    paramId = parameterIds[0];
                }
                //send request to database
                if (paramId !== null) {
                    request = await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': paramId, 'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) },
                        localStorage.getItem('token'), timeParam))
                    axiosCallVarList = [...axiosCallVarList, request];
                    request = null;
                }

            }

        }
        return axiosCallVarList;
    }
    const returnUpdatedAxiosCallList = async (preferenceData, userId, parameterIds) => {
        let axiosCallVarList = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;
        let currentScoreParamId = null;
        let previousScoreParamId
        let request = null;
        for (let x = 0; x < preferenceData.length; x++) {
            currentWeekDayId = x + 1;
            for (let y = 0; y < preferenceData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                //score 0 means, button is disabled
                if (preferenceData[x].timeSlotGroup[y].currentScore !== 0) {
                    if (preferenceData[x].timeSlotGroup[y].currentScore !== preferenceData[x].timeSlotGroup[y].previousScore) {
                        if (preferenceData[x].timeSlotGroup[y].currentScore === 5) {
                            currentScoreParamId = parameterIds[2];
                            if (preferenceData[x].timeSlotGroup[y].previousScore === 3) {
                                previousScoreParamId = parameterIds[1];
                            } else {
                                previousScoreParamId = parameterIds[0];
                            }
                        } else if (preferenceData[x].timeSlotGroup[y].currentScore === 3) {
                            currentScoreParamId = parameterIds[1];
                            if (preferenceData[x].timeSlotGroup[y].previousScore === 5) {
                                previousScoreParamId = parameterIds[2];
                            } else {
                                previousScoreParamId = parameterIds[0];
                            }
                        } else {
                            currentScoreParamId = parameterIds[0];
                            if (preferenceData[x].timeSlotGroup[y].previousScore === 5) {
                                previousScoreParamId = parameterIds[2];
                            } else {
                                previousScoreParamId = parameterIds[1];
                            }
                        }
                        //save timeslot on the selected score parameter id
                        if (currentScoreParamId !== null) {
                            request = await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': currentScoreParamId, 'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) },
                                localStorage.getItem('token'), timeParam))
                            axiosCallVarList = [...axiosCallVarList, request];
                            request = null;
                            currentScoreParamId = null;
                        }
                        //delete timeslot from the previous score parameter id
                        if (previousScoreParamId !== null) {
                            request = await axios(getGenericAuthModelConfig("DELETE", "", { 'parameter_id': previousScoreParamId, 'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) },
                                localStorage.getItem('token'), timeParam));
                            axiosCallVarList = [...axiosCallVarList, request];
                            request = null;
                            previousScoreParamId = null;
                        }
                    }
                }
            }
        }
        return axiosCallVarList;
    }


    const calculateAndReturnTimeSlotId = (weekDayId, dayTimeId) => {
        //timeSlot fomular *
        //(6 *(weekDayId -1) ) + timeslotId

        //NOTE: This fomular depends on the timeslotId begin arranged in a 
        //certain way. check out the time_slot table in DB incase there is 
        //goona be a change or addition to the time_slot table.
        return (6 * (weekDayId - 1)) + dayTimeId;
    }
    return (
        <React.Fragment>
            <div id={PageCss.PageBody}>
                <div id={PageCss.container1}>

                    <select id={PageCss.semesterSelect} onChange={(e) => { setSelectedSemesterId(e.target.value) }}
                        value={selectedSemesterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                            {semester.name + " " + semester.year}</option>)}
                    </select>
                    <br></br>
                    <span id={PageCss.groupClassHeading}><b>Would you like to teach <br></br>two back to back classes:
                    </b></span>
                    <br></br>
                    <select id={PageCss.groupClassDropDown} onChange={(e) => { setSelectedGroupClassOption(e.target.value) }} value={selectedGroupClassOption} disabled={disableDropDown}>
                        <option value={0}>No</option>
                        <option value={1}>I don't care</option>
                        <option value={2}>Yes</option>
                    </select>
                    <br></br>
                    <span id={PageCss.numDaysHeading}><b>Select how many days you<br></br> would like to teach:</b></span>
                    <select id={PageCss.numDaysDropDown} onChange={(e) => { setSelectNumOfDays(e.target.value) }} value={selectedNumOfDays} disabled={disableDropDown}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div id={PageCss.container2}>
                    <div className={PageCss.HeaderContainer}>
                        <span id={PageCss.Pgheading}>Please select your preferences.</span>

                    </div>

                    <select id={PageCss.semesterSelectMobile} className={PageCss.HideOnMobile}
                        onChange={(e) => { setSelectedSemesterId(e.target.value) }} value={selectedSemesterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                            {semester.name + " " + semester.year}</option>)}

                    </select>
                    <DropDownSquareGroup disabled={false} SubmitPreference={submitPreferenceRequest} selectedSemesterId={selectedSemesterId} id={localStorage.getItem('userId')} preferenceRoute={getPreferenceData} />
                </div>
            </div>
        </React.Fragment >
    );
}

export default FacultyPreferencePg;