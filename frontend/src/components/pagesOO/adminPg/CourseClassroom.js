import React, { useEffect } from 'react';
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


    const GetAllCourses = () => {
        
            axios(getCourseModelConfig( "GET", "", null ,  localStorage.getItem('token') )).then(
                    res => {
                        console.log("All Courses", res.data)
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
        
    useEffect(()=>{
        GetAllCourses();
    })
        
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
                    <Form.Label className={`${pageCss.customLabel}`}>Course</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email"  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Classroom</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Semester</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>
            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN}>Submit</Button></div>
            
            </div>
        </React.Fragment>);
}
 
export default CourseClassroom ;