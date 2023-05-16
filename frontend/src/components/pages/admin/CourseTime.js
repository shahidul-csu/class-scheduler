import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseTime.module.css"
import PageCss from '../../../styles/AvaliabilityPg.module.css'
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
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

    const availabilityRoute = ROUTER.api.getAvaliabilityData;
    const preferenceRoute = ROUTER.api.getPreferenceData;

    const populateSemesterDropDown = () => {
        axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
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

    useEffect(() => {
        populateSemesterDropDown();
    }, [])

    const populateCourseDropDown = () => {
        axios(getCourseModelConfig("GET", "", {}, localStorage.
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

    useEffect(() => {
        populateCourseDropDown();
    }, [])



    const handleCourseSelect = (e) => {
        setSelectedCourseId(e.target.value);
    }


    // Store Time Specifications to Course
    // const assignCourseToTime = async (availabilityData) => {
    //     let parameterDataId = await makeNewParameterData();
    //     let CurrentCourseId = localStorage.getItem('course_id');
    //     let axiosCallListForSelectedSlots = returnAxiosCallList(availabilityData, parameterDataId, CurrentCourseId);

    //     await axios.all([...axiosCallListForSelectedSlots]).then(
    //         axios.spread((...responses) => {

    //             // use/access the results
    //             console.log(responses);
    //             alert("Your course specifications has been sent.\n")
    //         })
    //     )
    //         .catch(errors => {
    //             // react on errors.
    //             console.error(errors);
    //         });

    // }

    const submitAvaliabilityRequest = async (availabilityData, isNewEntry, hasPreferenceEntries) => {
        let parameterDataId = null;
        let LoggedInUserId = selectedCourseId;
        let axiosCallListForSelectedSlots = null;
        //sends same timeslot entries to preference paramater
        let axiosCallListForPreference = null;
        let preferenceParameterId = null;
        if (isNewEntry) {
            //sendong entries to availability parameter
            parameterDataId = await makeNewParameterData("availability");
            axiosCallListForSelectedSlots = returnUpdatedAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);
        } else {
            //get availability parameter id
            parameterDataId = await getParameterData();
            //update availability entries 
            axiosCallListForSelectedSlots = returnUpdatedAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);
        }
        //availability
        await axios.all([...axiosCallListForSelectedSlots]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    alert("Your availability specifications have been sent.\n Now Wait for an approval from the admin.")
                } else {
                    alert("Your availability specifications have been updated.\n Now Wait for an approval from the admin.")
                }
            })
        ).catch(errors => {
            // react on errors.
            console.error(errors);
        });

        //check if preference entries exist, else create new parameter for preference entries
        if (hasPreferenceEntries) {
            //get preference parameter 
            let lowParameterId = await getPreferenceParameterId(1);
            let mediumParameterId = await getPreferenceParameterId(3);
            let highParameterId = await getPreferenceParameterId(5);

            //if there's no high score parameter create a new one for new entries
            if (highParameterId === null) {
                highParameterId = await makeNewParameterData("preference");
            }
            axiosCallListForPreference = returnUpdatedPreferenceList(availabilityData, lowParameterId, mediumParameterId, highParameterId, LoggedInUserId);
            //update preference entries
        } else {
            //sending entries to preference parameter
            preferenceParameterId = await makeNewParameterData("preference");
            axiosCallListForPreference = returnUpdatedAxiosCallList(availabilityData, preferenceParameterId, LoggedInUserId);
        }
        //preference
        await axios.all([...axiosCallListForPreference]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    console.log("preference entries sent");
                } else {
                    console.log("preference entries updated");
                }
            }
            )).catch(
                errors => {
                    console.error(errors);
                }
            )
    }


    // Create Parameter Data
    const makeNewParameterData = async (entryType) => {
        let Data = null
        if (entryType === "availability") {
            //availability approved variable is null so that the user knows that their entry waiting for approval/rejection
            await axios(getParameterDataModelConfig(
                "POST", "", {
                approved: true, requirement: true, score: 0, parameter_id: null,
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
        } else if (entryType === "preference") {
            //preference entries are automatically approved and default score is 5
            await axios(getParameterDataModelConfig(
                "POST", "", {
                approved: true, requirement: false, score: 5, parameter_id: null,
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
        }

        return Data; //returns the newly made requirement
    }

    const getParameterData = async () => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", {
            'semesterId': selectedSemesterId,
            'course_id': selectedCourseId
        }, {},
            localStorage.getItem('token'), ROUTER.api.getCourseAvaliabilityData)).then(
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

    const getPreferenceParameterId = async (score) => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'course_id': selectedCourseId }, {}, localStorage.getItem('token'), ROUTER.api.getPreferenceParameterIds)).then(
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

    const returnUpdatedAxiosCallList = (availabilityData, paramId, courseId) => {
        //axiosCallVarList is a list of axios post request
        let axiosCallVarList = []
        let currentWeekDayId = null;
        let currentDayTimeId = null;

        // for all weekdays
        for (var x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslotes in each weekday
            for (var y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlote is selected
                if (availabilityData[x].timeSlotGroup[y].selected) {
                    console.log(paramId);
                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("POST", "", {
                        'parameter_id': paramId,
                        'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.courseTimeParam))
                    ];
                }
            }

        }
        return axiosCallVarList
    }

    const returnUpdatedPreferenceList = (availabilityData, lowParam, mediumParam, highParam, courseId) => {
        let axiosCallListForPreference = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;

        //for all weekdays
        for (let x = 0; availabilityData.length; x++) {
            currentWeekDayId = x + 1;
            //for all timeslots in each weekday
            for (let y = 0; availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                //if timeblock is selected and it wasn't in the database
                if (availabilityData[x].timeSlotGroup[y].selected && !availabilityData[x].timeSlotGroup[y].wasSelected) {
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore === null) {
                        axiosCallListForPreference = [...axiosCallListForPreference,
                        axios(getGenericAuthModelConfig("POST", "", {
                            'parameter_id': highParam,
                            'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                currentWeekDayId, currentDayTimeId)
                        },
                            localStorage.getItem('token'), ROUTER.api.courseTimeParam))
                        ];
                    }

                } else if (!availabilityData[x].timeSlotGroup[y].selected && availabilityData[x].timeSlotGroup[y].wasSelected) {
                    //Delete all entries from the database dependeding of score
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore !== null) {
                        if (availabilityData[x].timeSlotGroup[y].preferenceScore === 5) {
                            axiosCallListForPreference = [...axiosCallListForPreference,
                            axios(getGenericAuthModelConfig("DELETE", "", {
                                'parameter_id': highParam,
                                'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                    currentWeekDayId, currentDayTimeId)
                            },
                                localStorage.getItem('token'), ROUTER.api.courseTimeParam))
                            ];
                        } else if (availabilityData[x].timeSlotGroup[y].preferenceScore === 3) {
                            axiosCallListForPreference = [...axiosCallListForPreference,
                            axios(getGenericAuthModelConfig("DELETE", "", {
                                'parameter_id': mediumParam,
                                'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                    currentWeekDayId, currentDayTimeId)
                            },
                                localStorage.getItem('token'), ROUTER.api.courseTimeParam))
                            ];
                        } else {
                            axiosCallListForPreference = [...axiosCallListForPreference,
                            axios(getGenericAuthModelConfig("DELETE", "", {
                                'parameter_id': lowParam,
                                'course_id': courseId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                    currentWeekDayId, currentDayTimeId)
                            },
                                localStorage.getItem('token'), ROUTER.api.courseTimeParam))
                            ];
                        }
                    }
                }
            }
        }
    }


    // Time Slot
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
                    <option value="0">Select Course:</option>
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