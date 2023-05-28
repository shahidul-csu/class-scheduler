import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/AddSemester.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import { getSemesterModelConfig } from '../../../network/RequestTemplates';
import SeasonDropdown from '../../PgComponents/DropDownSquares/SeasonDropdown';
import axios from "axios";


const AddSemester = () => {
    const [semesterName, setSemesterName] = useState("")
    const [year, setYear] = useState(0)
    const [duration, setDuration] = useState(0);

    const addSemester = () => {
        // Send a request to retrieve all existing semesters
        axios(getSemesterModelConfig("GET")).then(
            res => {
                const semesters = res.data;

                // Check whether the new semester already exists
                const semesterExists = semesters.some(semester => {
                    return (
                        semester.name.toLowerCase() === semesterName.toLowerCase() &&
                        semester.year === parseInt(year)
                    );
                });

                if (semesterExists) {
                    alert("This semester already exists.");
                } else {
                    // Create the new semester if it doesn't already exist
                    axios(getSemesterModelConfig("POST", "", { year: year, name: semesterName, duration_weeks: duration }, null)).then(
                        res => {
                            console.log("Semester Created", res.data)
                            alert("Course Created")
                            window.location.reload(true) // RELOADS PAGE
                        }
                    ).catch(
                        err => {
                            alert(err)
                            console.log(err)
                        }
                    )
                }
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }


    useEffect(() => {
        document.title = "Class Scheduler"
    }, [])


    return (<React.Fragment >
        <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Create New Semester</span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon"
                        style={{ height: "25px", width: "25px" }} />

                </div>


            </div>
            <p id={pageCss.pgInstructions} ><b>Create a new Semester below.</b></p>

            <Form id={pageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${pageCss.formGroup}`} >
                    {/* <Form.Label className={`${pageCss.customLabel}`}>Time of Year</Form.Label>
                    <Form.Control className={pageCss.customInput} type="text" placeholder="Summer"
                        onChange={(e) => setSemesterName(e.target.value)} /> */}

                    <Form.Label className={pageCss.customLabel}>Time of Year</Form.Label>
                    <SeasonDropdown onChange={(value) => setSemesterName(value)} />

                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Year</Form.Label>
                    <Form.Control className={pageCss.customInput} type="text" placeholder="2020"
                        onChange={(e) => setYear(e.target.value)} />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Duration (Weeks)</Form.Label>
                    <Form.Control className={pageCss.customInput} type="text" placeholder="16"
                        onChange={(e) => setDuration(e.target.value)} />
                </Form.Group>
            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN} onClick={addSemester} >Submit</Button></div>

        </div>
    </React.Fragment>);
}

export default AddSemester;