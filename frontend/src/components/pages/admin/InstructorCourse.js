import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/InstructorCourse.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import { getCourseModelConfig, getSemesterModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';
import ROUTER from '../../../network/Router'
import axios from "axios";

const InstructorCourse = () => {
    const [courseList, setCourseList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [selectedInstructorId, setSelectedInstructorId] = useState("0");
    const [instructorList, setInstructorList] = useState([]);

    const GetAllCourses = () => {

        axios(getCourseModelConfig("GET", "", null, localStorage.getItem('token'))).then(
            res => {
                console.log("All Courses", res.data);
                setCourseList(res.data);
                // alert("Course created")
                // window.location.reload(true) // RELOADS PAGE
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }

    const GetAllSemesters = () => {

        axios(getSemesterModelConfig("GET", "", null, localStorage.getItem('token'))).then(
            res => {
                console.log("All Semesters", res.data);
                setSemesterList(res.data);
                // alert("Course created")
                // window.location.reload(true) // RELOADS PAGE
            }
        ).catch(
            err => {
                // alert(err)
                console.log(err)
            }
        )
    }

    const GetAllInstructors = () => {
        axios(getGenericAuthModelConfig("GET", {}, {},
            localStorage.getItem('token'), ROUTER.api.users)).then(
                res => {
                    console.log("All Instructors", res.data);
                    setInstructorList(res.data)


                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            );

        // axios(getGenericAuthModelConfig("GET", { 'semester_id': semesterId }, {}, localStorage.getItem('token'), ROUTER.api.getInstructorListPerSemester)).then(
        //     res => {
        //         setInstructorList(res.data.data)
        //         console.log(JSON.stringify(res.data.data))
        //     }

        // ).catch(
        //     err => {
        //         alert(err)
        //         console.log(err)
        //     }
        // )
    }
    // useEffect(()=>{
    //     GetAllCourses();
    // })
    // useEffect(() => {
    //     setSelectedInstructorId("0");
    // }, [selectedSemeterId])
    // const handleSemesterChange = (e) => {
    //     const semesterId = e.target.value;
    //     setSelectedSemesterId(semesterId);
    //     if (semesterId != 0) {
    //         GetAllInstructors(semesterId);
    //     }
    // }
    // useEffect(() => {
    //     GetAllInstructors();
    // }, [])
    useEffect(() => {
        GetAllCourses();
        GetAllSemesters();
        GetAllInstructors();
    }, [])


    return (<React.Fragment >
        <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Assign Instructor to Course </span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon"
                        style={{ height: "25px", width: "25px" }} />

                </div>


                {/* <div id={pageCss.myButton} >
                    <Button id={pageCss.ULButton}>Course List</Button>
                </div> */}

            </div>
            <p id={pageCss.pgInstructions} ><b>Assign a specific instructor to a course.</b></p>

            <Form id={pageCss.MyForm} >

                <Form.Group className={pageCss.formGroup}>
                    <select className={`${pageCss.mySelect}`}>
                        <option value={0}>Instructor:</option>
                        {instructorList
                            .filter(instructor => !instructor.is_superuser)
                            .map((instructor, index) => {
                                return (
                                    <option key={index} value={instructor.id}>
                                        {instructor.first_name} {instructor.last_name}
                                    </option>
                                );
                            })}
                    </select>
                </Form.Group>



                <Form.Group className={pageCss.formGroup}>
                    <select className={`${pageCss.mySelect}`}>
                        <option value={0}>Course:</option>
                        {courseList.map((course, index) => {
                            return <option key={index} value={course.course_id}>
                                {course.name}
                            </option>
                        })}
                    </select>
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <select className={`${pageCss.mySelect}`}>
                        <option value={0}>Semester:</option>
                        {/* {courseList.map(()=><option value={courses.value}>{courseList.name}</option>)} */}

                        {semesterList.map((semester, index) => {
                            return <option key={index} value={semester.semester_id}>
                                {semester.name}{" "}{semester.year}
                            </option>
                        })}

                    </select>
                </Form.Group>
            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN}>Submit</Button></div>

        </div>
    </React.Fragment>);
}

export default InstructorCourse;