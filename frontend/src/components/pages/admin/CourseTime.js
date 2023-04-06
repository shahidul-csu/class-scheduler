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
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState("0");
    const [courseList, setCourseList] = useState([]);
    const [courseName, setCourseName] = useState("");

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
    const assignCourseToTime = async (availabilityData) => {
        let parameterDataId = await makeNewParameterData();
        let CurrentCourseId = localStorage.getItem('course_id');
        let axiosCallListForSelectedSlots = returnAxiosCallList(availabilityData, parameterDataId, CurrentCourseId);

        await axios.all([...axiosCallListForSelectedSlots]).then(
            axios.spread((...responses) => {

                // use/access the results
                console.log(responses);
                alert("Your course specifications has been sent.\n")
            })
        )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });

    }


    // Create Parameter Data
    const makeNewParameterData = async () => {
        let Data = null
        await axios(getParameterDataModelConfig(
            "POST", "", {
            approved: false, requirement: true, score: 0, parameter_id: null,
            'semester_id': +selectedSemeterId
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
        return Data; //returns the newly made requirement
    }


    // Return Call List
    //returns a list of axios calls based on the selected timeSlots
    const returnAxiosCallList = (availabilityData, paramId, courseId) => {
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
                    value={selectedSemeterId}>
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



            <DropDownSquareGroup disabled={false}
                SubmitAvaliability={assignCourseToTime}
                selectedSemesterById={selectedSemeterId}
                selectedCourseId={selectedCourseId} />

        </div>
    </React.Fragment >);
}

export default CourseTime;