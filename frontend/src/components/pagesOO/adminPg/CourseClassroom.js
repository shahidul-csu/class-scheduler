import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseClassroom.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import { getCourseModelConfig , getSemesterModelConfig , getClassroomModelConfig } from '../../../network/RequestTemplates';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {LoggedInUserContext} from "../../../App.js" //import the use context variable

const CourseClassroom = () => {
    let navigate = useNavigate();
    const [courseList, setCourseList] = useState([]);
    const [classroomList, setClassroomList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);

    const GetAllCourses = () => {
        
            axios(getCourseModelConfig( "GET", "", null ,  localStorage.getItem('token') )).then(
                    res => {
                        console.log("All Courses", res.data);
                        setCourseList(res.data);
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

    const GetAllClassrooms = () => {
        
        axios(getClassroomModelConfig( "GET", "", null ,  localStorage.getItem('token') )).then(
                res => {
                    console.log("All Classrooms", res.data);
                    setClassroomList(res.data);
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

    const GetAllSemesters = () => {
        
        axios(getSemesterModelConfig( "GET", "", null ,  localStorage.getItem('token') )).then(
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
        
    useEffect(()=>{
        GetAllCourses();
    }, [courseList])
    useEffect(()=>{
        GetAllClassrooms();
    }, [classroomList])
    useEffect(()=>{
        GetAllSemesters();
    }, [semesterList])
        
        return (<React.Fragment >
            <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Assign Course to Classroom </span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon" 
                    style={{height: "25px", width:"25px"}}/>

                </div>


                {/* <div id={pageCss.myButton} >
                    <Button id={pageCss.ULButton}>Course List</Button>
                </div> */}
                
            </div>
            <p id={pageCss.pgInstructions} ><b>Make requirements or preferences for Classrooms and Courses</b></p>

            <Form id={pageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${pageCss.formGroup}`} >
                    {/* <Form.Label className={`${pageCss.customLabel}`}>Course</Form.Label> */}
                    {/* <Form.Control className={pageCss.customInput} type="email"  /> */}
                    <select className={` ${pageCss.mySelect}`}>
                        <option value={0}>Course:</option>
                        {/* {courseList.map(()=><option value={courses.value}>{courseList.name}</option>)} */}
                        
                        {courseList.map((course, index) => {
                                        return <option key={index} value={course.course_id}>
                                            {course.name}
                                        </option>
                                    })}

                    </select>
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    {/* <Form.Label className={pageCss.customLabel}>Classroom</Form.Label> */}
                    {/* <Form.Control className={pageCss.customInput}type="email"  /> */}
                    <select className={` ${pageCss.mySelect}`}>
                        <option value={0}>Classroom:</option>
                        {/* {courseList.map(()=><option value={courses.value}>{courseList.name}</option>)} */}
                        
                        {classroomList.map((classroom, index) => {
                                        return <option key={index} value={classroom.classroom_id}>
                                            {classroom.classroom_name}
                                        </option>
                                    })}

                    </select>
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    {/* <Form.Label className={pageCss.customLabel}>Semester</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  /> */}
                    <select className={` ${pageCss.mySelect}`}>
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
 
export default CourseClassroom ;