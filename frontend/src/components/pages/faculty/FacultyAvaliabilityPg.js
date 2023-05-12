import React, { useEffect, useState } from 'react';

import PageCss from '../../../styles/AvaliabilityPg.module.css'
import DropDownSquareGroup from '../../PgComponents/DropDownSquares/DropDownSquareGroup';
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getParameterDataModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';

//Note: to cut down on api calls Mondays id = 1, tuesday id =2 ...
//and for timeslots 8:AM-10:AM id = 1, 10AM-12PM id =2 ..
//THE DATABASE MUST ALWAYS MATCH THIS LOGIC FOR THIS IMPLEMENTATION
// TO WORK.

const FacultyAvaliabiltyPg = () => {
    const [selectedSemesterId, setSelectedSemesterId] = useState("0");
    const [semesterList, setSemesterList] = useState([]);


    // let date = new Date();
    // console.log(date.getDate());

    const populateSemesterDropDown = () => {
        axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
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

    useEffect(() => {
        populateSemesterDropDown();
    }, [])




    const submitAvaliabilityRequest = async (availabilityData, isNewEntry) => {
        let parameterDataId = null;
        let LoggedInUserId = localStorage.getItem('userId');
        let axiosCallListForSelectedSlots = null;
        if (isNewEntry) {
            parameterDataId = await makeNewParameterData();
            axiosCallListForSelectedSlots = returnAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);
        } else {
            parameterDataId = await getParameterData();
            axiosCallListForSelectedSlots = returnUpdatedAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);
        }


        await axios.all([...axiosCallListForSelectedSlots]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    alert("Your availability specifications have been sent.\n Now Wait for an approval from the admin.")
                } else {
                    alert("Your availability specifications have been updated.\n Now Wait for an approval from the admin.")
                }
            })
        )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });

    }


    const makeNewParameterData = async () => {
        let Data = null
        await axios(getParameterDataModelConfig(
            "POST", "", {
            approved: null, requirement: true, score: 0, parameter_id: null,
            'semester_id': +selectedSemesterId
        },
            localStorage.getItem('token'))).then(
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
    //request to get the parameter id of the logged in user using userId and semesterId
    const getParameterData = async () => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", {
            'semesterId': selectedSemesterId,
            'userId': localStorage.getItem('userId')
        }, {},
            localStorage.getItem('token'), ROUTER.api.getAvaliabilityData)).then(
                res => {
                    Data = res.data.data[0].parameter_id
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        return Data;
    }
    //returns a list of axios calls based on the selected timeSlots
    const returnAxiosCallList = (availabilityData, paramId, userId) => {
        //axiosCallVarList is a list of axios post request
        let axiosCallVarList = []
        let currentWeekDayId = null;
        let currentDayTimeId = null;

        // for all weekdays
        for (var x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslotes in each weekday
            for (var y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlote is selected
                if (availabilityData[x].timeSlotGroup[y].selected) {
                    console.log(paramId);
                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("POST", "", {
                        'parameter_id': paramId,
                        'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.userTimeParam))
                    ];
                }
            }

        }
        return axiosCallVarList
    }

    const returnUpdatedAxiosCallList = (availabilityData, paramId, userId) => {
        let axiosCallVarList = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;


        // for all weekdays
        for (var x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslots in each weekday
            for (var y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlot is selected
                if (availabilityData[x].timeSlotGroup[y].selected && !(availabilityData[x].timeSlotGroup[y].wasSelected)) {
                    console.log(paramId);
                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("POST", "", {
                        'parameter_id': paramId,
                        'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.userTimeParam))
                    ];
                } else if (!availabilityData[x].timeSlotGroup[y].selected && availabilityData[x].timeSlotGroup[y].wasSelected) {

                    axiosCallVarList = [...axiosCallVarList,

                    axios(getGenericAuthModelConfig("DELETE", "", {
                        'parameter_id': paramId,
                        'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                            currentWeekDayId, currentDayTimeId)
                    },
                        localStorage.getItem('token'), ROUTER.api.userTimeParam))
                    ];


                }
            }

        }
        return axiosCallVarList

    }

    const calculateAndReturnTimeSlotId = (weekDayId, dayTimeId) => {
        //timeSlot fomular *
        //(6 *(weekDayId -1) ) + timeslotId

        //NOTE: This fomular depends on the timeslotId begin arranged in a 
        //certain way. check out the time_slot table in DB incase there is 
        //goona be a change or addition to the time_slot table.
        return (6 * (weekDayId - 1)) + dayTimeId;
    }



    return (
        <React.Fragment>
            <div id={PageCss.PageBody}>
                <div id={PageCss.container1}>

                    <select id={PageCss.semesterSelect} onChange={(e) => { setSelectedSemesterId(e.target.value) }}
                        value={selectedSemesterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                            {semester.name + " " + semester.year}</option>)}
                    </select>
                </div>
                <div id={PageCss.RadioButton}></div>
                <div id={PageCss.container2}>

                    <div className={PageCss.HeaderContainer}>
                        <span id={PageCss.Pgheading}>Please select your availability.</span>

                    </div>

                    <select id={PageCss.semesterSelectMobile} className={PageCss.HideOnMobile}
                        onChange={(e) => { setSelectedSemesterId(e.target.value) }} value={selectedSemesterId}>
                        <option value={0}>Select Semester:</option>
                        {semesterList.map((semester, index) => <option key={index} value={semester.semester_id}>
                            {semester.name + " " + semester.year}</option>)}

                    </select>

                    <DropDownSquareGroup disabled={false} SubmitAvaliability={submitAvaliabilityRequest}
                        selectedSemesterById={selectedSemesterId} />



                </div>
            </div>


        </React.Fragment>
    );
}

export default FacultyAvaliabiltyPg;