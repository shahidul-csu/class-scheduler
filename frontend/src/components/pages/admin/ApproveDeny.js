import React, {useEffect, useState} from "react";
import PageCss from "../../../styles/ApproveDeny.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getGenericAuthModelConfig} from "../../../network/RequestTemplates";

const ApproveDeny = () => {
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [isDisabled = true, setIsDisabled] = useState();

    const populateSemesterDropDown = () => {
        axios(getSemesterModelConfig( "GET", "",{}, localStorage.getItem('token') )).then(
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
    
    useEffect(()=>{
        populateSemesterDropDown();
    },[])

    const handleSemesterChange = (e) => {
        const semesterId = e.target.value;
        setSelectedSemesterId(semesterId);
        if(semesterId != 0){
            isDisabled = false;
        }else{
            isDisabled = true;
        }
    }

    return (
        <React.Fragment>
            <div id={PageCss.PageBody}>
                <div id={PageCss.container1}>

                    <select id={PageCss.semesterSelect} onChange={handleSemesterChange}
                    value={selectedSemeterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester,index)=> <option key={index} value={semester.semester_id}>
                            {semester.name +" "+semester.year}</option>)}
                    </select>
                    <br></br>
                    <br></br>
                    <select id={PageCss.instructorSelect} disabled={isDisabled}>
                        <option value={0}>Select Instructor:</option>
                    </select>
                </div>

            </div>

        
        </React.Fragment>
    );
}

export default ApproveDeny