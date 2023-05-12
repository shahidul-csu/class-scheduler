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
    const [teachingParameter, setTeachingParameter] = useState(0);
    const [teachingDays, setTeachingDays] = useState(0);
    const [backToBackParameter, setBackToBackParameter] = useState(0);
    const [backToBackScore, setBackToBackScore] = useState(0);


    const populateSemesterDropDown = () => {
        axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
            res => {
                setSemesterList(res.data)
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }


    useEffect(
        () => {
            populateSemesterDropDown();
        }, []);

    //wait for selectedSemesterId to change before fetching data
    useEffect(() => {
        async function FetchData() {
            if (selectedSemesterId !== "0") {
                setDisableDropDown(false);
                //check if there if user has entries on database (number of days and group class)
                await axios(getGenericAuthModelConfig("GET", {
                    'semesterId': selectedSemesterId, 'userId': localStorage.getItem('userId')
                }, {}, localStorage.getItem('token'),
                    ROUTER.api.getUserPreferenceOptionEntries)).then(
                        res => {
                            if (res.data.group.length > 0) {
                                setSelectedGroupClassOption(res.data.group[0].score);
                                setBackToBackScore(res.data.group[0].score);
                                setBackToBackParameter(res.data.group[0].parameter_id);

                            } else {
                                setSelectedGroupClassOption(0);
                            }
                            if (res.data.teaching.length > 0) {
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
    }
        , [selectedSemesterId]);

    const submitPreferenceRequest = async (preferenceData, isNewEntry) => {
        let axiosCallListForSelectedSlots = null;
        let userId = localStorage.getItem('userId');
        let mediumParameterId = null;
        let highParameterId = null;
        if (isNewEntry) {
            //create two new parameters with score 3 and 5 (score 3 for medium and score 5 for high) 
            mediumParameterId = await makeNewParameterData(3);
            highParameterId = await makeNewParameterData(5);
            axiosCallListForSelectedSlots = returnAxiosCallList(preferenceData, userId, [mediumParameterId, highParameterId]);

            //create parameterId for back to back class
            //the score depends on user selection (0 means no, 1 means I dont care, 2 means yes)
            let backToBackParameterId = await makeNewParameterData(selectedGroupClassOption);
            await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': backToBackParameterId, 'user_id': userId }, localStorage.getItem('token'), ROUTER.api.userBackToBack))

            //parameterId for teachingparameter table
            let parameterNumOfDays = await makeNewParameterData(0);
            await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': parameterNumOfDays, 'user_id': userId, 'num_teaching_days': selectedNumOfDays }, localStorage.getItem('token'), ROUTER.api.userTeachingParam))

            //check if any parameterId has no entries in the user_time_parameter table, if not then delete the parameter
            await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'userId': userId }, {}, localStorage.getItem('token'),
                ROUTER.api.getPreferenceParameterIds)).then(
                    res => {
                        if (res.data.medium.length == 0) {
                            deleteParameterId(mediumParameterId);
                        }
                        if (res.data.high.length == 0) {
                            deleteParameterId(mediumParameterId);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
        } else {
            mediumParameterId = await getParameterData(3);
            highParameterId = await getParameterData(5);
            //check if the parameterIds are null, if they are then create new ones
            if (mediumParameterId === null) {
                mediumParameterId = await makeNewParameterData(3);
            }
            if (highParameterId === null) {
                highParameterId = await makeNewParameterData(5);
            }

        }


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
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'userId': localStorage.getItem('userId') }, {}, localStorage.getItem('token'))).then(
            res => {
                if (score === 3) {
                    Data = res.data.medium[0].parameter_id;
                } else if (score === 5) {
                    Data = res.data.high[0].parameter_id;
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
        await axios(getParameterDataModelConfig(
            "POST", "", {
            approved: true, requirement: false, score: score, parameter_id: null,
            'semester_id': +selectedSemesterId
        },
            localStorage.getItem('token'))).then(
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
    const returnAxiosCallList = (preferenceData, userId, parameterIds) => {
        let axiosCallVarList = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;


        // for all timeslotes in each weekday
        for (var x = 0; x < preferenceData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslotes in each weekday
            for (var y = 0; y < preferenceData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlote is selected
                if (preferenceData[x].timeSlotGroup[y].currentScore === 5) {

                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("POST", "", {
                        'parameter_id': parameterIds[1],
                        'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.userTimeParam))
                    ];
                } else if (preferenceData[x].timeSlotGroup[y].currentScore === 3) {
                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("POST", "", {
                        'parameter_id': parameterIds[0],
                        'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.userTimeParam))
                    ];
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
                    <DropDownSquareGroup disabled={false} SubmitPreference={submitPreferenceRequest} selectedSemesterId={selectedSemesterId} />
                </div>
            </div>
        </React.Fragment >
    );
}

export default FacultyPreferencePg;