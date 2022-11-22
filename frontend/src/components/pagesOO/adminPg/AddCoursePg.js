import React, {  useState,useContext, useEffect } from "react";
import pageheaderIcon from "../../../images/BooksIcon.png"
import AddUserPageCss from "../../../styles/AddUserPg.module.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { getCourseModelConfig } from '../../../network/RequestTemplates';
import {LoggedInUserContext} from "../../../App.js" //import the use context variable
import { useNavigate } from "react-router-dom";
const AddCoursePg = () => {
    let navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [courseSection, setCourseSection] = useState("");
    const [classSize, setClassSize] = useState(0);
    const [courseGroup, setcourseGroup] = useState('');
    const [syncTime, setSyncTime] = useState(true);
    const [units, setUnits] = useState(3);
    const [weeklyFrequency, setweeklyFrequency] = useState(0);

    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext

    const AddCourse = () => {
        if(userData.is_superuser){
            axios(getCourseModelConfig( "POST", "", {name: courseName, capacity: +classSize, units: +units, number_per_week: +weeklyFrequency,
                Section: courseSection, courseGroup: courseGroup, sync_time: syncTime}, localStorage.getItem('token') )).then(
                    res => {
                        console.log("created new course", res.data)
                        alert("Course created")
                        window.location.reload(true) // RELOADS PAGE
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                )
        }
        else{
            
            console.log('Restricted Area');
            navigate('/FacultyLandingPg')
        }
    }




        return (
            <React.Fragment>
                <div id={AddUserPageCss.pageBody}>

                    <div id={AddUserPageCss.headerWrapper}>

                        <div id={AddUserPageCss.heading}>
                            <span id={AddUserPageCss.headerText} >Add New Course </span>

                            <img id={AddUserPageCss.PGIcon} src={pageheaderIcon} alt="Book Icon" 
                            style={{height: "25px", width:"25px"}}/>

                        </div>
                    </div>

                    <p id={AddUserPageCss.pgInstructions} ><b>Please add a course below with the
                         course name, units, weekly frequency, sync time, capacity, and 
                         group number.</b></p>

                    <Form id={AddUserPageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${AddUserPageCss.formGroup}`} >
                    <Form.Label className={`${AddUserPageCss.customLabel}`}>Course Name</Form.Label>
                    <Form.Control placeholder="ex. CST321" className={AddUserPageCss.customInput} type="text" 
                    onChange={(e) => setCourseName(e.target.value)} />
                </Form.Group>

                <Form.Group className={`${AddUserPageCss.formGroup}`} >
                    <Form.Label className={`${AddUserPageCss.customLabel}`}>Section</Form.Label>
                    <Form.Control placeholder="ex. 01" className={AddUserPageCss.customInput} type="text" 
                    onChange={(e) => setCourseSection(e.target.value)} />
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup}>
                    <Form.Label className={AddUserPageCss.customLabel}>Class Size</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput} type="number"  
                    onChange={(e) => setClassSize(e.target.value)} value={classSize}/>
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <Form.Label className={AddUserPageCss.customLabel}>Course Group</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput} type="text"  
                    onChange={(e) => setcourseGroup(e.target.value)}/>
                </Form.Group>

                <Form.Group className={AddUserPageCss.formGroup} >
                    <Form.Label className={AddUserPageCss.customLabel}>Units</Form.Label>
                    <Form.Control className={AddUserPageCss.customInput}type="number"  
                    onChange={(e) => setUnits(e.target.value)} value={units}/>
                </Form.Group>

                <div  className={AddUserPageCss.formGroup}>
                    <select className={` ${AddUserPageCss.mySelect}`} onChange={(e) => setweeklyFrequency(e.target.value)}>
                        <option value={0}>Weekly Frequency :</option>
                        <option  value={1}>1 time per week</option>
                        <option  value={2}>2 times per week</option>
                        <option  value={3}>3 times per week</option>
                        <option  value={4}>4 times per week</option>
                        <option  value={5}>5 times per week</option>
                    </select>
                    
                </div>

                <Form.Group className={`${AddUserPageCss.formGroup} ${AddUserPageCss.scyncTimPadding}`} >
                <Form.Label  className={AddUserPageCss.customLabel}>Scync Time ?</Form.Label>
                <br></br>
                    <input className={`${AddUserPageCss.radio} form-check-input`} type="radio" name="Radio" id="yes2" defaultChecked onChange={()=>
                    setSyncTime(true)}/>
                    
                    <label className="form-check-label" htmlFor="yes2">
                    <span className={AddUserPageCss.radioText}><b>Yes</b></span> 
                    </label>

                    <input  className={`${AddUserPageCss.radio} form-check-input`} type="radio" name="Radio" id="no2" onChange={()=>
                    setSyncTime(false)}/>
                    
                    <label  className="form-check-label" htmlFor="no2">
                           <span className={AddUserPageCss.radioText}>
                            <b>No</b></span> 
                    </label>

                </Form.Group>
                
            </Form>
            <div id={AddUserPageCss.divSubmit2}><Button id={AddUserPageCss.submitBTN} onClick={AddCourse}>Add Course</Button></div>
            
                        
                </div>
                

            </React.Fragment>
        );
}
 
export default AddCoursePg;
