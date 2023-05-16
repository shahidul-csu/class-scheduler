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
    //routes to fetch data from the database
    const availabilityRoute = ROUTER.api.getAvaliabilityData;
    const preferenceRoute = ROUTER.api.getPreferenceData;


    // let date = new Date();
    // console.log(date.getDate());

    useEffect(() => {
        async function populateSemesterDropDown() {
            await axios(getSemesterModelConfig("GET", "", {}, localStorage.getItem('token'))).then(
                res => {
                    setSemesterList(res.data)
                    setSelectedSemesterId(res.data[res.data.length - 1].semester_id);
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        }
        populateSemesterDropDown();
    }, [])




    const submitAvaliabilityRequest = async (availabilityData, isNewEntry, hasPreferenceEntries) => {
        let parameterDataId = null;
        let LoggedInUserId = localStorage.getItem('userId');
        let axiosCallListForSelectedSlots = null;

        if (isNewEntry) {
            //sending entries to availability parameter
            parameterDataId = await makeNewParameterData("availability");
            axiosCallListForSelectedSlots = returnAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);
        } else {
            //get availability parameter id
            parameterDataId = await getParameterData();
            //update availability entries 
            axiosCallListForSelectedSlots = returnUpdatedAxiosCallList(availabilityData, parameterDataId, LoggedInUserId);

            //Update approved status from parameter table
            await axios(getParameterDataModelConfig(
                "PUT", "", {
                approved: null, id: parameterDataId,
            },
                localStorage.getItem('token'))).then(
                    res => {
                        console.log("Parameter data updated")
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
        }
        //availability responses
        await axios.all([...axiosCallListForSelectedSlots]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    alert("Your availability specifications have been sent.\n Now Wait for an approval from the admin.")
                } else {
                    alert("Your availability specifications have been updated.\n Now Wait for an approval from the admin.")
                }
            })
        ).catch(errors => {
            // react on errors.
            console.error(errors);
        });

        //sends same timeslot entries to preference paramater
        let axiosCallListForPreference = null;
        let highParameterId = null;
        //check if preference entries exist, else create new parameter for preference entries
        if (hasPreferenceEntries) {
            console.log("Updating preference entries");
            //get preference parameter 
            let lowParameterId = await getPreferenceParameterId(1);
            let mediumParameterId = await getPreferenceParameterId(3);
            highParameterId = await getPreferenceParameterId(5);

            //if there's no high score parameter create a new one for new entries
            if (highParameterId === null) {
                highParameterId = await makeNewParameterData("preference");
            }
            console.log(availabilityData);

            axiosCallListForPreference = returnUpdatedPreferenceList(availabilityData, lowParameterId, mediumParameterId, highParameterId, LoggedInUserId);
            //update preference entries
        } else {
            //sending entries to preference parameter
            highParameterId = await makeNewParameterData("preference");
            axiosCallListForPreference = returnAxiosCallList(availabilityData, highParameterId, LoggedInUserId);
        }
        //preference responses
        await axios.all([...axiosCallListForPreference]).then(
            axios.spread((...responses) => {
                if (isNewEntry) {
                    console.log("preference entries sent");
                } else {
                    console.log("preference entries updated");
                }
            }
            )).catch(
                errors => {
                    console.error(errors);
                }
            )
    }


    const makeNewParameterData = async (entryType) => {
        let Data = null
        if (entryType === "availability") {
            //availability approved variable is null so that the user knows that their entry waiting for approval/rejection
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
        } else if (entryType === "preference") {
            //preference entries are automatically approved and default score is 5
            await axios(getParameterDataModelConfig(
                "POST", "", {
                approved: true, requirement: false, score: 5, parameter_id: null,
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
        }

        return Data; //returns the newly made requirement
    }
    //request to get the parameter id of the logged in user using userId and semesterId
    const getParameterData = async () => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", {
            'semesterId': selectedSemesterId,
            'id': localStorage.getItem('userId')
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

    //request to get parameter id of the logged in user based on the score
    const getPreferenceParameterId = async (score) => {
        let Data = null;
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': selectedSemesterId, 'id': localStorage.getItem('userId') }, {}, localStorage.getItem('token'), ROUTER.api.getPreferenceParameterIds)).then(
            res => {
                if (score === 5) {
                    if (res.data.high.length > 0) {
                        Data = res.data.high[0].parameter_id;
                    }

                } else if (score === 3) {
                    if (res.data.medium.length > 0) {
                        Data = res.data.medium[0].parameter_id;
                    }

                } else {
                    if (res.data.low.length > 0) {
                        Data = res.data.low[0].parameter_id;
                    }
                }
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
        for (let x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;

            // for all timeslots in each weekday
            for (let y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;

                // if timeSlot is selected and was not selected in previous entries then save a new entry to the database
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
        return axiosCallVarList;

    }

    //Update preference entries
    const returnUpdatedPreferenceList = (availabilityData, lowParam, mediumParam, highParam, userId) => {
        let axiosCallListForPreference = [];
        let currentWeekDayId = null;
        let currentDayTimeId = null;

        //for all weekdays
        for (let x = 0; x < availabilityData.length; x++) {
            currentWeekDayId = x + 1;
            //for all timeslots in each weekday
            for (let y = 0; y < availabilityData[x].timeSlotGroup.length; y++) {
                currentDayTimeId = y + 1;
                //if timeblock is selected and it wasn't in the database
                if (availabilityData[x].timeSlotGroup[y].selected && !(availabilityData[x].timeSlotGroup[y].wasSelected)) {
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore === null) {
                        axiosCallListForPreference = [...axiosCallListForPreference,
                        axios(getGenericAuthModelConfig("POST", "", {
                            'parameter_id': highParam,
                            'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                currentWeekDayId, currentDayTimeId)
                        },
                            localStorage.getItem('token'), ROUTER.api.userTimeParam))
                        ];
                    }

                } else if (!availabilityData[x].timeSlotGroup[y].selected && availabilityData[x].timeSlotGroup[y].wasSelected) {
                    //Delete all entries from the database dependeding of score
                    if (availabilityData[x].timeSlotGroup[y].preferenceScore !== null) {
                        if (availabilityData[x].timeSlotGroup[y].preferenceScore === 5) {
                            if (highParam !== null) {
                                axiosCallListForPreference = [...axiosCallListForPreference,
                                axios(getGenericAuthModelConfig("DELETE", "", {
                                    'parameter_id': highParam,
                                    'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                        currentWeekDayId, currentDayTimeId)
                                },
                                    localStorage.getItem('token'), ROUTER.api.userTimeParam))
                                ];
                            }
                        } else if (availabilityData[x].timeSlotGroup[y].preferenceScore === 3) {
                            if (mediumParam !== null) {
                                axiosCallListForPreference = [...axiosCallListForPreference,
                                axios(getGenericAuthModelConfig("DELETE", "", {
                                    'parameter_id': mediumParam,
                                    'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                        currentWeekDayId, currentDayTimeId)
                                },
                                    localStorage.getItem('token'), ROUTER.api.userTimeParam))
                                ];
                            }

                        } else {
                            if (lowParam !== null) {
                                axiosCallListForPreference = [...axiosCallListForPreference,
                                axios(getGenericAuthModelConfig("DELETE", "", {
                                    'parameter_id': lowParam,
                                    'user_id': userId, 'time_slot_id': calculateAndReturnTimeSlotId(
                                        currentWeekDayId, currentDayTimeId)
                                },
                                    localStorage.getItem('token'), ROUTER.api.userTimeParam))
                                ];
                            }
                        }

                    }
                }
            }
        }
        return axiosCallListForPreference;
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
                        selectedSemesterById={selectedSemesterId} availabilityRoute={availabilityRoute} preferenceRoute={preferenceRoute} id={localStorage.getItem('userId')} />



                </div>
            </div>


        </React.Fragment>
    );
}

export default FacultyAvaliabiltyPg;