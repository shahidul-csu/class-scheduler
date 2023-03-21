import React, { useEffect, useState } from "react";
import PageCss from "../../../styles/ApproveDeny.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getGenericAuthModelConfig } from "../../../network/RequestTemplates";

const ApproveDeny = () => {
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);

    const populateSemesterDropDown = () => {
        axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
            res => {
                setSemesterList(res.data)
                console.log(JSON.stringify(res.data))
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

    const handleSemesterChange = (e) => {
        const semesterId = e.target.value;
        setSelectedSemesterId(semesterId);
        if (semesterId != 0) {
            populateInstructorDropDown(semesterId);
        }
    }
    const populateInstructorDropDown = (semesterId) => {
        axios(getGenericAuthModelConfig("GET", { 'semester_id': semesterId }, {}, localStorage.getItem('token'), ROUTER.api.getInstructorListPerSemester)).then(
            res => {
                setInstructorList(res.data.data)
                console.log(JSON.stringify(res.data.data))
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }

    return (
        <React.Fragment>
            <div id={PageCss.PageBody}>
                <div id={PageCss.container1}>

                    <select id={PageCss.semesterSelect} onChange={handleSemesterChange}
                        value={selectedSemeterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                            {semester.name + " " + semester.year}</option>)}
                    </select>
                    <br></br>
                    <select id={PageCss.instructorSelect}>
                        <option value={0}>Select Instructor:</option>
                        {instructorList.map((instructor, index) => <option key={index} value={instructor.id}>
                            {instructor.first_name + " " + instructor.last_name}</option>)}
                    </select>
                </div>

            </div>


        </React.Fragment>
    );
}

export default ApproveDeny