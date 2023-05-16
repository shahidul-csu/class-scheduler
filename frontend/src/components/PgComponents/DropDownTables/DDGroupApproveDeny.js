import React, { createContext, useEffect, useRef, useState } from 'react';
import PageCss from "../../../styles/ApproveDeny.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ROUTER from '../../../network/Router';
import { getGenericAuthModelConfig } from '../../../network/RequestTemplates';
import DropDownAvailability from './DropDownAvailability';
import DropDownPreference from './DropDownPreference';
import loadingImg from '../../../images/loading.png'
export const DataContext = createContext()

const AvailabilityTimeSlots = () => [
    { timeSlotName: '8AM-10AM', selected: false }, { timeSlotName: '10AM-12PM', selected: false },
    { timeSlotName: '12PM-2PM', selected: false }, { timeSlotName: '2PM-4PM', selected: false },
    { timeSlotName: '4PM-6PM', selected: false }, { timeSlotName: '6PM-8PM', selected: false }]
const PreferenceTimeSlots = () => [
    { timeSlotName: '8AM-10AM', score: 0 }, { timeSlotName: '10AM-12PM', score: 0 },
    { timeSlotName: '12PM-2PM', score: 0 }, { timeSlotName: '2PM-4PM', score: 0 },
    { timeSlotName: '4PM-6PM', score: 0 }, { timeSlotName: '6PM-8PM', score: 0 }]

const DropDownGroupApproveDeny = (props) => {
    const [showLoadingIcon, setShowLoadingIcon] = useState(false)
    const [isDoneFetching, setIsDoneFetching] = useState(false);
    const [availabilityTimeSlotGroup, setAvailabilityTimeSlotGroup] = useState([
        { timeSlotGroup: AvailabilityTimeSlots() }, //Monday
        { timeSlotGroup: AvailabilityTimeSlots() }, //Tuesday
        { timeSlotGroup: AvailabilityTimeSlots() }, //Wednesday
        { timeSlotGroup: AvailabilityTimeSlots() }, //Thursday
        { timeSlotGroup: AvailabilityTimeSlots() }, //Friday
    ]);
    const [preferenceTimeSlotGroup, setPreferenceTimeSlotGroup] = useState([
        { timeSlotGroup: PreferenceTimeSlots() }, //Monday
        { timeSlotGroup: PreferenceTimeSlots() }, //Tuesday
        { timeSlotGroup: PreferenceTimeSlots() }, //Wednesday
        { timeSlotGroup: PreferenceTimeSlots() }, //Thursday
        { timeSlotGroup: PreferenceTimeSlots() }, //Friday
    ]);

    const [parameterIdsPreference, setParameterIdsPreference] = useState([]);
    const [parameterIdAvailability, setParameterIdAvailability] = useState(null);

    //keep track of availability status
    const availabilityApprovalStatus = useRef(null);
    const preferenceApprovalStatus = useRef(null);

    useEffect(async () => {
        //fetch availability timeslots
        async function fetchData() {
            //fetch availability timeslots
            setShowLoadingIcon(true);
            await axios(getGenericAuthModelConfig("GET", {
                'semesterId': props.selectedSemesterId,
                'id': props.selectedInstructorId
            }, {},
                localStorage.getItem('token'), ROUTER.api.getAvaliabilityData)).then(
                    res => {
                        if (res.data.data.length > 0) {
                            availabilityApprovalStatus.current = res.data.data[0].approved;
                            setParameterIdAvailability(res.data.data[0].parameter_id);
                            updateAvailabilityVisual(res.data.data);
                        } else {
                            availabilityApprovalStatus.current = null;
                            setParameterIdAvailability(null);
                            resetAvailabilityTimeSlots(); //this is to empty previous info and rerender table
                        }
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                );
            //fetch preference timeslots
            await axios(getGenericAuthModelConfig("GET", { 'semesterId': props.selectedSemesterId, 'id': props.selectedInstructorId }, {}, localStorage.getItem('token'), ROUTER.api.getPreferenceData)).then(
                res => {
                    if (res.data.data.length > 0) {
                        preferenceApprovalStatus.current = res.data.data[0].approved;
                        updatePreferenceVisual(res.data.data);
                    } else {
                        preferenceApprovalStatus.current = null;
                        resetPreferenceTimeSlots(); //this is to empty previous info and rerender table
                    }
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            );
            //fetch parameterIds for preference
            let newLowScoreParameterId = null;
            let newMediumScoreParameterId = null;
            let newHighScoreParameterId = null;
            let parameterIdsArray = [];
            await axios(getGenericAuthModelConfig("GET", { 'semesterId': props.selectedSemesterId, 'id': props.selectedInstructorId }, {}, localStorage.getItem('token'), ROUTER.api.getPreferenceParameterIds)).then(
                res => {
                    if (res.data.medium.length > 0) {
                        newMediumScoreParameterId = res.data.medium[0].parameter_id;
                    }
                    if (res.data.high.length > 0) {
                        newHighScoreParameterId = res.data.high[0].parameter_id;
                    }
                    if (res.data.low.length > 0) {
                        newLowScoreParameterId = res.data.low[0].parameter_id;
                    }
                    setShowLoadingIcon(false);
                }
            ).catch(
                err => {
                    alert('An error has occurred, please refresh the page and try again')
                    console.log(err)
                }
            )
            //save non null parameterIds to array
            if (newLowScoreParameterId != null) {
                parameterIdsArray.push(newLowScoreParameterId);
            }
            if (newMediumScoreParameterId != null) {
                parameterIdsArray.push(newMediumScoreParameterId);
            }
            if (newHighScoreParameterId != null) {
                parameterIdsArray.push(newHighScoreParameterId);
            }
            setParameterIdsPreference(parameterIdsArray);
            setIsDoneFetching(true);
        }

        //update availibility visual
        function updateAvailabilityVisual(data) {
            let newTimeSlotGroupList = [
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },];
            for (let x = 0; x < data.length; x++) {
                newTimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].selected = true;
            }
            setAvailabilityTimeSlotGroup(newTimeSlotGroupList);
        }
        //update preference visual
        function updatePreferenceVisual(data) {
            let newTimeSlotGroupList = [
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },];
            for (let x = 0; x < data.length; x++) {
                newTimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].score = data[x].score;
            }
            setPreferenceTimeSlotGroup(newTimeSlotGroupList);
        }

        //reset availability timeslots if there is no availability entries
        function resetAvailabilityTimeSlots() {
            let newtimeSlotGroupList = [
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
                { timeSlotGroup: AvailabilityTimeSlots() },
            ];
            setAvailabilityTimeSlotGroup(newtimeSlotGroupList);
        }

        //reset preference timeslots if there is no preference entries
        function resetPreferenceTimeSlots() {
            let newtimeSlotGroupList = [
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
                { timeSlotGroup: PreferenceTimeSlots() },
            ];
            setPreferenceTimeSlotGroup(newtimeSlotGroupList);
        }
        setIsDoneFetching(false);
        //wait for instructorId to be selected
        if (props.selectedInstructorId != "0") {
            fetchData();
        }

    }, [props.selectedInstructorId]);

    //disable dropdown if data is not fetched or if semesterId and instructorId are not selected
    const isDisabled = () => {
        if (!isDoneFetching) {
            return PageCss.disabled;
        } else {
            return PageCss.notDisabled;
        }
    }
    const loadingIconVisibility = () => {
        if (showLoadingIcon) {
            return <img id={PageCss.loadingData} src={loadingImg}></img>
        }
    }
    return (
        <React.Fragment>
            <DataContext.Provider value={{
                preferenceTimeSlots: preferenceTimeSlotGroup,
                availabilityTimeSlots: availabilityTimeSlotGroup,
                availabilityParameterId: parameterIdAvailability,
                availabilityStatus: availabilityApprovalStatus,
                preferenceParameterIds: parameterIdsPreference,
                preferenceStatus: preferenceApprovalStatus,

            }
            }>
                <div style={{ position: 'relative' }}>
                    {loadingIconVisibility()}
                    <div className={`${PageCss.dropDownShell} ${isDisabled()}`}>
                        <DropDownAvailability entryTypeName="Availability" />
                        <DropDownPreference entryTypeName="Preference" />
                    </div>
                </div>
            </DataContext.Provider>
        </React.Fragment>

    );
}

export default DropDownGroupApproveDeny;