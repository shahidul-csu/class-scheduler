import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseTime.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import { getCourseModelConfig , getSemesterModelConfig , getClassroomModelConfig } from '../../../network/RequestTemplates';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {LoggedInUserContext} from "../../../App.js" //import the use context variable

const CourseTime = () => {
    let navigate = useNavigate();
    const [rule, setRule] = useState(true);

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
        
    let courses = [
        useEffect(()=>{
            GetAllCourses();
        })
    ]
    useEffect(()=>{
        GetAllCourses();
    })
        
        return (<React.Fragment >
            <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Assign Course to Time</span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon" 
                    style={{height: "25px", width:"25px"}}/>

                </div>


                {/* <div id={pageCss.myButton} >
                    <Button id={pageCss.ULButton}>Course List</Button>
                </div> */}
                
            </div>
            <p id={pageCss.pgInstructions} ><b>Assign a Course to a Time.</b></p>

            <Form id={pageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${pageCss.formGroup}`} >
                    <Form.Label className={`${pageCss.customLabel}`}>Course</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email"  />
                    {/* <div  className={pageCss.formGroup}>
                    <select className={` ${pageCss.mySelect}`}>
                        <option value={0}>Instructor</option>
                        {courses.map((courses)=><option value={courses.value}>{courses.className}</option>)}
                        <option  value={1}>TBD</option>
                        <option  value={2}>Placeholder_1</option>
                        <option  value={3}>Placeholder_2</option>
                        <option  value={4}>Placeholder_3</option>
                        <option  value={5}>Placeholder_4</option>
                    </select>
                    
                    </div> */}
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Time</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Semester</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>
            <div className={`${pageCss.radiodiv}`}>
            <Form.Group className={`${pageCss.formGroup} ${pageCss.scyncTimPadding}`} >
                <Form.Label  className={pageCss.customLabel}>Preference or Requirement?</Form.Label>
                <br></br>
                    <input className={`${pageCss.radio} form-check-input`} type="radio" name="Radio" id="yes2" defaultChecked onChange={()=>setRule(true)}/>
                    
                    <label className="form-check-label" htmlFor="yes2">
                    <span className={pageCss.radioText}><b>Hard Rule</b></span> 
                    </label>

                    <input  className={`${pageCss.radio} form-check-input`} type="radio" name="Radio" id="no2" onChange={()=>setRule(false)}/>
                    
                    <label  className="form-check-label" htmlFor="no2">
                           <span className={pageCss.radioText}>
                            <b>Soft Rule</b></span> 
                    </label>

                </Form.Group>
                </div>
            </Form>

            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN}>Submit</Button></div>
            
            </div>
        </React.Fragment>);
}
 
export default CourseTime ;