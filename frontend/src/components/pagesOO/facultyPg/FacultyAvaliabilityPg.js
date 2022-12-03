import React, { Component, useEffect, useState } from 'react';

import PageCss from '../../../styles/AvaliabilityPg.module.css'
import DropDownSquareGroup from '../../DropDownSquares/DropDownSquareGroup';
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getParameterDataModelConfig,getGenericAuthModelConfig } from '../../../network/RequestTemplates';

//Note: to cut down on api calls Mondays id = 1, tuesday id =2 ...
//and for timeslots 8:AM-10:AM id = 1, 10AM-12PM id =2 ..
//THE DATABASE MUST ALWAYS MATCH THIS LOGIC FOR THIS IMPLEMENTATION
// TO WORK.

const FacultyAvaliabiltyPg = ()=>{
    const [selectedSemeterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);
    
    
    // let date = new Date();
    // console.log(date.getDate());

    const populateSemesterDropDown = () => {
            axios(getSemesterModelConfig( "GET", "",{}, localStorage.getItem('token') )).then(
                    res => {
                        setSemesterList(res.data)
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                )
    }

    useEffect(()=>{
        console.log("fetched all semester")
        populateSemesterDropDown();
    },[semesterList.length ===[]])

    const isSemesterSelected= ()=>{

        return (selectedSemeterId ==="0" )? false : true;
    }

    const submitAvaliabilityRequest= async (availabilityData)=>{
       let parameterDataId= await makeNewParameterData();
       let LoggedInUserId = localStorage.getItem('userId');
       let axiosCallListForSelectedSlots = returnAxiosCallList(availabilityData,parameterDataId, LoggedInUserId);

      await axios.all([...axiosCallListForSelectedSlots]).then(
        axios.spread((...responses) => {

        // use/access the results
        console.log(responses);
        alert("Your avaliability specifications has been sent.\n"+
        "Now Wait for an approval from the admin.")
        })
      )
      .catch(errors => {
        // react on errors.
        console.error(errors);
        });
    }

    const makeNewParameterData= async()=>{
        let Data = null
       await axios(getParameterDataModelConfig( "POST", "",{approved:false, requirement:true, score:0,parameter_id:null,
        'semester_id':+selectedSemeterId}, 
        localStorage.getItem('token') )).then(
            res => {
                Data = res.data.parameter_id;
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        return Data; //returns the newly made requirement
    }

    //returns a list of axios calls based on the selected timeSlots
    const returnAxiosCallList=(availabilityData,paramId,userId)=>{
        //axiosCallVarList is a list of axios post request
        let axiosCallVarList =[]
        let currentWeekDayId = null;
        let currentDayTimeId = null;

        // for all weekdays
        for(var x=0; x < availabilityData.length; x++){
            currentWeekDayId = x+1; 

            // for all timeslotes in each weekday
            for(var y=0; y< availabilityData[x].timeSlotGroup.length; y++){ 
                currentDayTimeId = y+1;

                // if timeSlote is selected
                if(availabilityData[x].timeSlotGroup[y].selected){ 
                console.log(paramId);
                    axiosCallVarList = [...axiosCallVarList, 
                        
                        axios(getGenericAuthModelConfig( "POST", "",{'parameter_id': paramId, 
                            'user_id':userId, 'time_slot_id':calculateAndReturnTimeSlotId(
                                currentWeekDayId,currentDayTimeId)}, 
                            localStorage.getItem('token'), ROUTER.api.userTimeParam))
                        ];
                }
            }
        }
        return axiosCallVarList
    }

    const calculateAndReturnTimeSlotId=(weekDayId, dayTimeId)=>{
    //timeSlot fomular *
    //(6 *(weekDayId -1) ) + timeslotId

    //NOTE: This fomular depends on the timeslotId begin arranged in a 
    //certain way. check out the time_slot table in DB incase there is 
    //goona be a change or addition to the time_slot table.
    return (6*(weekDayId-1)) + dayTimeId;
    }
        
        return (
            <React.Fragment>
            <div id={PageCss.PageBody}>
            <div id={PageCss.container1}>

                <select id={PageCss.semesterSelect} onChange={(e)=>{setSelectedSemesterId(e.target.value)}}
                value={selectedSemeterId}>
                    <option value={0}>Select Semester:</option>
                    {semesterList.map((semester,index)=> <option key={index} value={semester.semester_id}>
                        {semester.name +" "+semester.year}</option>)}
                </select>
            </div>

            <div id={PageCss.container2}>

            <div className={PageCss.HeaderContainer}>
            <span id={PageCss.Pgheading}>Please select your availability.</span>

            </div>
            

            <select id={PageCss.semesterSelectMobile} className={PageCss.HideOnMobile} 
            onChange={(e)=>{setSelectedSemesterId(e.target.value)}} value={selectedSemeterId}>
                    <option value={0}>Select Semester:</option>
                    {semesterList.map((semester,index)=> <option key={index} value={semester.semester_id}>
                        {semester.name +" "+semester.year}</option>)}
                    
                </select>

            <DropDownSquareGroup disabled={!isSemesterSelected()} SubmitAvaliability={submitAvaliabilityRequest}/>

            </div>
            </div>

            
        </React.Fragment>
        );
}
 
export default FacultyAvaliabiltyPg ;