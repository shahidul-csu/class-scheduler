import React, { useEffect, useState } from "react";
import PageCss from "../../../styles/ApproveDeny.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getGenericAuthModelConfig } from "../../../network/RequestTemplates";
import DropDownGroupApproveDeny from "../../PgComponents/DropDownTables/DDGroupApproveDeny";

const ApproveDeny = () => {
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [selectedInstructorId, setSelectedInstructorId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [isDoneFetching, setIsDoneFetching] = useState(false);

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
    useEffect(() => {
        setSelectedInstructorId("0");
    }, [selectedSemeterId])
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
                    <select id={PageCss.instructorSelect} onChange={(e) => { setSelectedInstructorId(e.target.value) }} value={selectedInstructorId}>
                        <option value={0}>Select Instructor:</option>
                        {instructorList.map((instructor, index) => <option key={index} value={instructor.id}>
                            {instructor.first_name + " " + instructor.last_name}</option>)}
                    </select>
                </div>
                <div id={PageCss.container2}>
                    <div className={PageCss.HeaderContainer}>
                        <span id={PageCss.Pgheading}>Please choose whether to approve or deny.</span>

                    </div>
                    <DropDownGroupApproveDeny selectedSemesterId={selectedSemeterId}
                        selectedInstructorId={selectedInstructorId} />
                </div>
            </div>

        </React.Fragment>
    );
}

export default ApproveDeny