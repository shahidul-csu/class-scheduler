import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseTime.module.css"
import PageCss from '../../../styles/AvaliabilityPg.module.css'
import pageheaderIcon from "../../../images/UserManagement.png"
import { getCourseModelConfig, getSemesterModelConfig, getParameterDataModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';

// new imports
import ROUTER from '../../../network/Router'
import DropDownSquareGroup from '../../PgComponents/DropDownSquares/DropDownSquareGroup';
import axios from "axios";

const CourseTime = () => {
    const [selectedSemesterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState("0");
    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState("");

    const availabilityRoute = ROUTER.api.getCourseAvaliabilityData;
    const preferenceRoute = ROUTER.api.getCoursePreferenceData;
    const timeParam = ROUTER.api.courseTimeParam;

    useEffect(() => {
        async function populateSemesterDropDown() {
            await axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
                res => {
                    setSemesterList(res.data)
                    if (res.data.length > 0) {
                        setSelectedSemesterId(res.data[res.data.length - 1].semester_id);
                    }

                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        }
        populateSemesterDropDown();
    }, [])

    useEffect(() => {
        async function populateCourseDropDown() {
            await axios(getCourseModelConfig("GET", "", {}, localStorage.
                getItem('token'))).then(
                    res => {
                        setCourseList(res.data)
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                )
        }
        populateCourseDropDown();
    }, [])



    const handleCourseSelect = (e) => {
        setSelectedCourseId(e.target.value);
    }
    const submitAvaliabilityRequest = async (availabilityData, isNewEntry, hasPreferenceEntries) => {
        let availabilityParameterId = null;
        let courseId = selectedCourseId;
        let axiosCallListForSelectedSlots = null;
        console.log("course:", selectedCourseId);
        console.log("semester:", selectedSemesterId);
        console.log(availabilityData)
        if (isNewEntry) {
            //sending entries to availability parameter
            availabilityParameterId = await makeNewParameterData("availability");
            axiosCallListForSelectedSlots = await returnAxiosCallList(availabilityData, availabilityParameterId, courseId);
        } else {
            //get availability parameter id
            availabilityParameterId = await getParameterData();
            //update availability entries 
            axiosCallListForSelectedSlots = await returnUpdatedAxiosCallList(availabilityData, availabilityParameterId, courseId);
            //Update approved status from availability entry
            await axios(getParameterDataModelConfig("PUT", "", { approved: true, id: availabilityParameterId }, localStorage.getItem('token'))).then(
                res => {
                    console.log("Parameter data updated")
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
        //availability responses
        await axios.all([...axiosCallListForSelectedSlots]).then(axios.spread((...responses) => {
            if (isNewEntry) {
                console.log("Availability entries sent")
            } else {
                console.log("Availability entries updated")
            }
        })
        ).catch(errors => {
            // react on errors.
            console.error(errors);
        });

        //sends same timeslot entries to preference paramater
        let axiosCallListForPreference = null;
        let highParameterId = null;
        //check if preference entries exist, else create new parameter for preference entries
        if (hasPreferenceEntries) {
            console.log("Updating preference entries");
            //get preference parameter ids (There is a preference parameter id for each score) 
            let lowParameterId = await getPreferenceParameterId(1);
            let mediumParameterId = await getPreferenceParameterId(3);
            highParameterId = await getPreferenceParameterId(5);

            //if there's no high score parameter create a new one for new entries
            if (highParameterId === null) {
                highParameterId = await makeNewParameterData("preference");
            }
            //Update preference entries
            axiosCallListForPreference = await returnUpdatedPreferenceList(availabilityData, lowParameterId, mediumParameterId, highParameterId, courseId);


            //delete any preference parameter id that is unused
            //check if any parameterId has no entries in the coruse_time_parameter table, if not then delete the parameter
            await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': courseId }, {}, localStorage.getItem('token'), ROUTER.api.getCoursePreferenceParameterIds)).then(
                res => {
                    if (res.data.low.length == 0 && lowParameterId !== null) {
                        deletePreferenceParameterId(lowParameterId);
                    }
                    if (res.data.medium.length == 0 && mediumParameterId !== null) {
                        deletePreferenceParameterId(mediumParameterId);
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        } else {
            //sending entries to preference parameter
            highParameterId = await makeNewParameterData("preference");
            axiosCallListForPreference = await returnAxiosCallList(availabilityData, highParameterId, courseId);
        }
        //preference responses
        await axios.all([...axiosCallListForPreference]).then(axios.spread((...responses) => {
            console.log("Preference entries updated/sent")
            if (isNewEntry) {
                alert("Availability specifications for instructor have been sent.\n ")
            } else {
                alert("Availability specifications have been updated.\n")
            }
        }
        )).catch(
            errors => {
                console.error(errors);
            }
        )
    }
    const makeNewParameterData = async (entryType) => {
        let Data = null
        if (entryType === "availability") {
            //availability approved variable is true since admin is sending these entries
            await axios(getParameterDataModelConfig("POST", "", { approved: true, requirement: true, score: 0, parameter_id: null, 'semester_id': +selectedSemesterId }, localStorage.getItem('token'))).then(
                res => {
                    Data = res.data.parameter_id;
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        } else if (entryType === "preference") {
            //preference entries are approved by default and default score is 5
            await axios(getParameterDataModelConfig("POST", "", { approved: true, requirement: false, score: 5, parameter_id: null, 'semester_id': +selectedSemesterId }, localStorage.getItem('token'))).then(
                res => {
                    Data = res.data.parameter_id;
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        }

        return Data; //returns the newly made parameter id
    }
    const getParameterData = async () => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': selectedCourseId }, {}, localStorage.getItem('token'), ROUTER.api.getCourseAvaliabilityData)).then(
            res => {
                Data = res.data.data[0].parameter_id
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        return Data;
    }
    //request to get parameter id of the logged in user based on the score
    const getPreferenceParameterId = async (score) => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': selectedCourseId }, {}, localStorage.getItem('token'), ROUTER.api.getCoursePreferenceParameterIds)).then(
            res => {
                if (score === 5) {
                    if (res.data.high.length > 0) {
                        Data = res.data.high[0].parameter_id;
                    }
                } else if (score === 3) {
                    if (res.data.medium.length > 0) {
                        Data = res.data.medium[0].parameter_id;
                    }
                } else {
                    if (res.data.low.length > 0) {
                        Data = res.data.low[0].parameter_id;
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
    //returns a list of axios calls based on the selected timeSlots
    const returnAxiosCallList = async (availabilityData, paramId, courseId) => {
        //axiosCallVarList is a list of axios post request
        let axiosCallVarList = []
        let currentWeekDayId = null;
        let currentDayTimeId = null;
        let request = null;

        // for all weekdays
        for (var x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslotes in each weekday
            for (var y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlote is selected then save timeslot to the database
                if (availabilityData[x].timeSlotGroup[y].selected) {
                    request = await axios(getGenericAuthModelConfig("POST", "", { 'parameter_id': paramId, 'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) }, localStorage.getItem('token'), timeParam));
                    axiosCallVarList = [...axiosCallVarList, request];
                    request = null;
                }
            }
        }
        return axiosCallVarList
    }
    //Update preference entries
    const returnUpdatedAxiosCallList = async (availabilityData, paramId, courseId) => {
        let axiosCallVarList = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;
        let requestType = null;
        let request = null;

        // for all weekdays
        for (let x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;
            // for all timeslots in each weekday
            for (let y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                // if timeSlot is selected and was not selected in previous entries then save a new timeslot to the database
                if (availabilityData[x].timeSlotGroup[y].selected && !(availabilityData[x].timeSlotGroup[y].wasSelected)) {
                    requestType = "POST";
                    //else if timeSlot is not selected (currently) but was selected, then delete timeslot from availability entry
                } else if (!availabilityData[x].timeSlotGroup[y].selected && availabilityData[x].timeSlotGroup[y].wasSelected) {
                    requestType = "DELETE";
                }
                if (requestType !== null) {
                    request = await axios(getGenericAuthModelConfig(requestType, "", { 'parameter_id': paramId, 'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) }, localStorage.getItem('token'), timeParam))
                    axiosCallVarList = [...axiosCallVarList, request];
                    //reset variables
                    request = null;
                    requestType = null;
                }
            }

        }
        return axiosCallVarList;

    }
    //delete any parameter id that is unused
    const deletePreferenceParameterId = async (parameterId) => {
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
    //Update preference entries
    const returnUpdatedPreferenceList = async (availabilityData, lowParam, mediumParam, highParam, courseId) => {
        let axiosCallListForPreference = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;
        let request = null;
        let requestType = null;
        let paramId = null;

        //for all weekdays
        for (let x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;
            //for all timeslots in each weekday
            for (let y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                if (availabilityData[x].timeSlotGroup[y].selected && availabilityData[x].timeSlotGroup[y].wasSelected) {
                    continue;
                    //if timeblock is selected and it wasn't selected in previous entries then save a new entry to the database
                } else if (availabilityData[x].timeSlotGroup[y].selected && !(availabilityData[x].timeSlotGroup[y].wasSelected)) {
                    //new entries are saved with a score of 5
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore === null) {
                        requestType = "POST";
                        paramId = highParam;
                    }
                } else { //delete all every other entry
                    //Delete all entries from the database dependeding of score
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore !== null) {
                        requestType = "DELETE";
                        if (availabilityData[x].timeSlotGroup[y].preferenceScore === 5) {
                            paramId = highParam;
                        } else if (availabilityData[x].timeSlotGroup[y].preferenceScore === 3) {
                            paramId = mediumParam;
                        } else {
                            paramId = lowParam;
                        }
                    }
                }
                //send request
                if (paramId !== null) {
                    request = await axios(getGenericAuthModelConfig(requestType, "", { 'parameter_id': paramId, 'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(currentWeekDayId, currentDayTimeId) }, localStorage.getItem('token'), timeParam))
                    axiosCallListForPreference = [...axiosCallListForPreference, request];
                    //reset variables
                    request = null;
                    requestType = null;
                    paramId = null;
                }
            }
        }
        return axiosCallListForPreference;
    }

    const calculateAndReturnTimeSlotId = (weekDayId, dayTimeId) => {
        //timeSlot fomular *
        //(6 *(weekDayId -1) ) + timeslotId

        //NOTE: This fomular depends on the timeslotId begin arranged in a 
        //certain way. check out the time_slot table in DB incase there is 
        //goona be a change or addition to the time_slot table.
        return (6 * (weekDayId - 1)) + dayTimeId;
    }


    return (<React.Fragment >
        <div id={pageCss.pageBody}>
            <div id={PageCss.container1}>

                <select id={pageCss.semesterSelect} onChange={(e) => { setSelectedSemesterId(e.target.value) }}
                    value={selectedSemesterId}>
                    <option value={0}>Select Semester:</option>
                    {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                        {semester.name + " " + semester.year}</option>)}
                </select>
                <br></br>
                <br></br>
                <br></br>

                <select
                    id={pageCss.courseSelect}
                    onChange={handleCourseSelect}
                    value={selectedCourseId}>
                    <option value={0}>Select Course:</option>
                    {courseList.map((course, index) => (
                        <option key={index} value={course.course_id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Assign Course to Time</span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon"
                        style={{ height: "25px", width: "25px" }} />

                </div>

            </div>
            <p id={pageCss.pgInstructions} ><b>Assign a Course to a Time.</b></p>


            {/* SubmitAvaliability={assignCourseToTime} */}
            <DropDownSquareGroup disabled={false}
                SubmitAvaliability={submitAvaliabilityRequest}
                selectedSemesterById={selectedSemesterId}
                availabilityRoute={availabilityRoute}
                preferenceRoute={preferenceRoute}
                id={selectedCourseId} />

        </div>
    </React.Fragment >);
}

export default CourseTime;