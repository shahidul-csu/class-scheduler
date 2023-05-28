import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseSemester.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import { getCourseModelConfig, getSemesterModelConfig } from '../../../network/RequestTemplates';
import axios from "axios";

const CourseSemester = () => {
    const [courseList, setCourseList] = useState([]);
    const [rule, setRule] = useState(true);
    const [semesterList, setSemesterList] = useState([]);

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

    // let courses = [
    //     useEffect(()=>{
    //         GetAllCourses();
    //     })
    // ]
    useEffect(() => {
        GetAllCourses();
    }, [])
    useEffect(() => {
        GetAllSemesters();
    }, [])

    return (<React.Fragment >
        <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Assign Course to Semester</span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon"
                        style={{ height: "25px", width: "25px" }} />

                </div>


                {/* <div id={pageCss.myButton} >
                    <Button id={pageCss.ULButton}>Course List</Button>
                </div> */}

            </div>
            <p id={pageCss.pgInstructions} ><b>Assign a Course to a Semester</b></p>

            <Form id={pageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${pageCss.formGroup}`}>
                    {/* <Form.Label className={pageCss.customLabel}>Semester</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  /> */}
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


                <Form.Group className={`${pageCss.formGroup}`} >
                    {/* <Form.Label className={`${pageCss.customLabel}`}>Course</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email"  /> */}

                    <select className={`${pageCss.mySelect}`}>
                        <option value={0}>Course:</option>
                        {/* {courseList.map(()=><option value={courses.value}>{courseList.name}</option>)} */}

                        {courseList.map((course, index) => {
                            return <option key={index} value={course.course_id}>
                                {course.name}
                            </option>
                        })}


                        {/* <option  value={1}>TBD</option>
                        <option  value={2}>Placeholder_1</option>
                        <option  value={3}>Placeholder_2</option>
                        <option  value={4}>Placeholder_3</option>
                        <option  value={5}>Placeholder_4</option> */}
                    </select>


                </Form.Group>

                {/* <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Year</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group> */}

            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN}>Submit</Button></div>

        </div>
    </React.Fragment>);
}

export default CourseSemester;