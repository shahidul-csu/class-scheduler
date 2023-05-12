import React, { createContext, useEffect, useRef, useState } from 'react';
import PageCss from "../../../styles/ApproveDeny.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ROUTER from '../../../network/Router';
import { getGenericAuthModelConfig } from '../../../network/RequestTemplates';
import DropDownAvailability from './DropDownAvailability';
import DropDownPreference from './DropDownPreference';
export const DataContext = createContext()

const DefaultTimeSlots = () => [
    { timeSlotName: '8AM-10AM', selected: false }, { timeSlotName: '10AM-12PM', selected: false },
    { timeSlotName: '12PM-2PM', selected: false }, { timeSlotName: '2PM-4PM', selected: false },
    { timeSlotName: '4PM-6PM', selected: false }, { timeSlotName: '6PM-8PM', selected: false }]

const DropDownGroupApproveDeny = (props) => {

    const [isDoneFetching, setIsDoneFetching] = useState(false);
    const [preferenceTimeSlotGroup, setPreferenceTimeSlotGroup] = useState([
        { timeSlotGroup: DefaultTimeSlots() }, //Monday
        { timeSlotGroup: DefaultTimeSlots() }, //Tuesday
        { timeSlotGroup: DefaultTimeSlots() }, //Wednesday
        { timeSlotGroup: DefaultTimeSlots() }, //Thursday
        { timeSlotGroup: DefaultTimeSlots() }, //Friday
    ]);
    const [availabilityTimeSlotGroup, setAvailabilityTimeSlotGroup] = useState([
        { timeSlotGroup: DefaultTimeSlots() }, //Monday
        { timeSlotGroup: DefaultTimeSlots() }, //Tuesday
        { timeSlotGroup: DefaultTimeSlots() }, //Wednesday
        { timeSlotGroup: DefaultTimeSlots() }, //Thursday
        { timeSlotGroup: DefaultTimeSlots() }, //Friday
    ]);

    const [parameterIdsPreference, setParameterIdsPreference] = useState([]);
    const [parameterIdAvailability, setParameterIdAvailability] = useState(null);

    //keep track of availability status
    const availabilityApprovalStatus = useRef(null);
    const preferenceApprovalStatus = useRef(null);

    useEffect(async () => {
        setIsDoneFetching(false);

        //wait for the semesterId and instructorId to be selected
        if (props.selectedSemesterId != "0" && props.selectedInstructorId != "0") {
            FetchExistingData();
        }

    }, [props.selectedInstructorId, props.selectedSemesterId]);
    //Fetch entries for availability and preference using the semesterId and instructorId
    const FetchExistingData = async () => {

        console.log("Fetching data for semesterId: " + props.selectedSemesterId + " and instructorId: " + props.selectedInstructorId);
        //fetch availability data
        await axios(getGenericAuthModelConfig("GET", {
            'semesterId': props.selectedSemesterId,
            'userId': props.selectedInstructorId
        }, {},
            localStorage.getItem('token'), ROUTER.api.getAvaliabilityData)).then(
                res => {
                    if (res.data.data.length > 0) {
                        availabilityApprovalStatus.current = res.data.data[0].approved;
                        setParameterIdAvailability(res.data.data[0].parameter_id);
                        updateAvailabilityVisual(res.data.data);

                    } else {
                        setParameterIdAvailability(null);
                        availabilityApprovalStatus.current = null;
                        resetAvailabilityTimeSlots(); //this is used to rerender the table
                    }
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            );
        //fetch preference timeslots 
        await axios(getGenericAuthModelConfig("GET", {
            'semesterId': props.selectedSemesterId,
            'userId': props.selectedInstructorId
        }, {},
            localStorage.getItem('token'), ROUTER.api.getPreferenceData)).then(
                res => {
                    if (res.data.data.length > 0) {
                        preferenceApprovalStatus.current = res.data.data[0].approved;
                        updatePreferenceVisual(res.data.data);
                    } else {
                        preferenceApprovalStatus.current = null;
                        resetPreferenceTimeSlots(); //this is used to rerender the table 
                    }
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            );
        //fetch parameterIds for preference
        let newMediumScoreParameterId = null;
        let newHighScoreParameterId = null;
        let parameterIdsArray = [];
        await axios(getGenericAuthModelConfig("GET", { 'semesterId': props.selectedSemesterId, 'userId': props.selectedInstructorId }, {}, localStorage.getItem('token'), ROUTER.api.getPreferenceParameterIds)).then(
            res => {
                if (res.data.medium.length > 0) {
                    newMediumScoreParameterId = res.data.medium[0].parameter_id;
                }
                if (res.data.high.length > 0) {
                    newHighScoreParameterId = res.data.high[0].parameter_id;
                }
            }
        ).catch(
            err => {
                alert('An error has occurred, please refresh the page and try again')
                console.log(err)
            }
        )
        if (newMediumScoreParameterId != null) {
            parameterIdsArray.push(newMediumScoreParameterId);
        }
        if (newHighScoreParameterId != null) {
            parameterIdsArray.push(newHighScoreParameterId);
        }
        console.log(parameterIdsArray);
        setParameterIdsPreference(parameterIdsArray);
        setIsDoneFetching(true);

    }


    const updatePreferenceVisual = async (data) => {
        let newtimeSlotGroupList = [
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
        ];

        for (var x = 0; x < data.length; x++) {
            newtimeSlotGroupList[data[x].week_day_id - 1].
                timeSlotGroup[data[x].day_time_id - 1].selected = true;
        }


        setPreferenceTimeSlotGroup(newtimeSlotGroupList);
    }

    const updateAvailabilityVisual = (data) => {
        let newtimeSlotGroupList = [
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
        ];


        for (var x = 0; x < data.length; x++) {
            newtimeSlotGroupList[data[x].week_day_id - 1].
                timeSlotGroup[data[x].day_time_id - 1].selected = true;
        }
        setAvailabilityTimeSlotGroup(newtimeSlotGroupList);
    }
    //disable dropdown if data is not fetched or if semesterId and instructorId are not selected
    const isDisabled = () => {
        if (!isDoneFetching) {
            return PageCss.disabled;
        } else {
            return PageCss.notDisabled;
        }
    }


    const resetPreferenceTimeSlots = () => {
        let newtimeSlotGroupList = [
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
        ];
        setPreferenceTimeSlotGroup(newtimeSlotGroupList);
    }
    const resetAvailabilityTimeSlots = () => {
        let newtimeSlotGroupList = [
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
            { timeSlotGroup: DefaultTimeSlots() },
        ];
        setAvailabilityTimeSlotGroup(newtimeSlotGroupList);
    }
    return (
        <DataContext.Provider value={{
            preferenceTimeSlots: preferenceTimeSlotGroup,
            availabilityTimeSlots: availabilityTimeSlotGroup,
            availabilityParameterId: parameterIdAvailability,
            availabilityStatus: availabilityApprovalStatus,
            preferenceParameterIds: parameterIdsPreference,
            preferenceStatus: preferenceApprovalStatus,

        }
        }>
            <React.Fragment>
                <div className={`${PageCss.dropDownShell} ${isDisabled()}`}>
                    <DropDownAvailability entryTypeName="Availability" />
                    <DropDownPreference entryTypeName="Preference" />
                </div>
            </React.Fragment>
        </DataContext.Provider>

    );
}

export default DropDownGroupApproveDeny;