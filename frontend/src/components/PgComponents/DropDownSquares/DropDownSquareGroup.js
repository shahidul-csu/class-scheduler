import React, { createContext, useEffect, useRef, useState } from 'react';
import avalibilityPgCss from '../../../styles/AvaliabilityPg.module.css'
import DropDownSquares from './DropDownSquares';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ROUTER from '../../../network/Router';
import { getGenericAuthModelConfig } from '../../../network/RequestTemplates';
import loadingImg from '../../../images/loading.png'
import ApprovalStatusDisplay from '../ApprovalStatusDisplay';

export const DataContext = createContext()


const DefaultTimeSlots = () => [
    { timeSlotName: '8AM-10AM', selected: false, wasSelected: false, preferenceScore: null }, { timeSlotName: '10AM-12PM', selected: false, wasSelected: false, preferenceScore: null },
    { timeSlotName: '12PM-2PM', selected: false, wasSelected: false, preferenceScore: null }, { timeSlotName: '2PM-4PM', selected: false, wasSelected: false, preferenceScore: null },
    { timeSlotName: '4PM-6PM', selected: false, wasSelected: false, preferenceScore: null }, { timeSlotName: '6PM-8PM', selected: false, wasSelected: false, preferenceScore: null }]
// set all time slot selected to false




const DropDownSquareGroup = (props) => {

    //prevents the user from sumbiting if the user doesnt deselect any of the 
    //timeslots
    const numberOfDeselectedTimeSlot = useRef(0);
    const [showLoadingIcon, setShowLoadingIcon] = useState(false)
    const [isDoneFetching, setIsDoneFetching] = useState(false);

    // specifies if the displayed timeslots
    // is from the dataBase are not.
    const doesEntryExist = useRef(false);

    //check if there are preference entries on the database
    const hasPreferenceEntries = useRef(false);

    // if the displyed timeslot came from the 
    // dataBase we use this to activate or deactivate
    //each time slot.
    const [editMode, setEditMode] = useState(false);

    //if the dislayed info is old,
    // this lets us know if the avaliability
    // is approved or declined
    const isApproved = useRef(true);

    const [timeSlotGroupList, setTimeSlotGroupList] = useState([
        { timeSlotGroup: DefaultTimeSlots() },
        { timeSlotGroup: DefaultTimeSlots() },
        { timeSlotGroup: DefaultTimeSlots() },
        { timeSlotGroup: DefaultTimeSlots() },
        { timeSlotGroup: DefaultTimeSlots() },
    ]);

    //fetch avaliability data
    useEffect(() => {
        //gets the avaliability entry previously submitted by the user for the 
        //specifed semester
        async function fetchExistingAvaliabilityData() {
            setShowLoadingIcon(true);

            await axios(getGenericAuthModelConfig("GET", {
                'semesterId': props.selectedSemesterById,
                'id': props.id
            }, {},
                localStorage.getItem('token'), props.availabilityRoute)).then(
                    res => {

                        if (res.data.data.length > 0) {
                            doesEntryExist.current = true;
                            setEditMode(false); // dont let timeslot be clickable
                            updateVisualDetails(res.data.data);
                        }
                        else {
                            doesEntryExist.current = false;
                            setEditMode(true);
                            resetToDefaultTimeSlots();
                        }
                        setIsDoneFetching(true);
                        setShowLoadingIcon(false);
                    }
                ).catch(
                    err => {
                        alert(err)
                        console.log(err)
                    }
                )
        }
        function resetToDefaultTimeSlots() {
            let newtimeSlotGroupList = [
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
            ];

            numberOfDeselectedTimeSlot.current = 30; // helps disable the submited button
            setTimeSlotGroupList(newtimeSlotGroupList);
        }
        function updateVisualDetails(data) {
            console.log(JSON.stringify(data));
            let newtimeSlotGroupList = [
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
                { timeSlotGroup: DefaultTimeSlots() },
            ];


            for (let x = 0; x < data.length; x++) {
                newtimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].selected = true;
                newtimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].wasSelected = true;
            }

            numberOfDeselectedTimeSlot.current = 30 - data.length;

            // lets us know if the fetched timeslots is approved
            isApproved.current = data[0].approved;

            setTimeSlotGroupList(newtimeSlotGroupList);

        }

        //if a dropdown Option has been selected
        doesEntryExist.current = false;
        setIsDoneFetching(false);
        if (props.selectedSemesterById !== "0" && props.id !== "0") {
            console.log(props.id)
            fetchExistingAvaliabilityData();
        }
    }, [props.selectedSemesterById, props.id])


    //wait for the avaliability data to be fetched before fetching the preference data
    useEffect(() => {
        async function fetchPreferenceEntries() {
            await axios(getGenericAuthModelConfig("GET", {
                'semesterId': props.selectedSemesterById,
                'id': props.id
            }, {},
                localStorage.getItem('token'), props.preferenceRoute)).then(
                    res => {
                        if (res.data.data.length > 0) {
                            hasPreferenceEntries.current = true;
                        } else {
                            hasPreferenceEntries.current = false;
                        }
                        console.log(hasPreferenceEntries.current)
                        updateTimeSlotData(res.data.data);
                    }
                ).catch(
                    err => {
                        alert("Error has occurred, please try reloading the page")
                        console.log(err)
                    }
                );


        }
        function updateTimeSlotData(data) {
            let newtimeSlotGroupList = [...timeSlotGroupList];
            for (var x = 0; x < data.length; x++) {
                newtimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].preferenceScore = data[x].score;
            }
            setTimeSlotGroupList(newtimeSlotGroupList);
            console.log(timeSlotGroupList);
        }

        //if there are availiability entries then fetch the preference entries
        if (isDoneFetching) {
            fetchPreferenceEntries();
        }
    }, [isDoneFetching])

    const selectTimeBlock = (weekdayIndex, timeSlotIndex, isselected) => {
        //the DDSqure(Timeslot squares) use this function to 
        //report to this class what DDSuare has been selected.
        console.log(numberOfDeselectedTimeSlot.current)
        let newtimeSlotGroupList = [...timeSlotGroupList];

        newtimeSlotGroupList[weekdayIndex].
            timeSlotGroup[timeSlotIndex].selected = isselected;

        (isselected) ? numberOfDeselectedTimeSlot.current-- :
            numberOfDeselectedTimeSlot.current++;

        setTimeSlotGroupList(newtimeSlotGroupList);
    }

    const submitData = () => {
        let isNewEntry = null;
        if (numberOfDeselectedTimeSlot.current !== 0 && numberOfDeselectedTimeSlot.current !== 30
            && !doesEntryExist.current) {
            isNewEntry = true;
            props.SubmitAvaliability(timeSlotGroupList, isNewEntry, hasPreferenceEntries.current);
        } else if (doesEntryExist.current) {
            isNewEntry = false;
            props.SubmitAvaliability(timeSlotGroupList, isNewEntry, hasPreferenceEntries.current);
        }
    }

    //used to diable the slots when a semester has not been selected
    //or when fetching the avaliability Data
    const isDisabled = () => {
        if (props.disabled || !isDoneFetching) {
            return avalibilityPgCss.disabled;
        }
        else {
            return avalibilityPgCss.notDisabled;
        }
    }



    const disableSubmittionBtn = () => {
        if (numberOfDeselectedTimeSlot.current >= 0 && numberOfDeselectedTimeSlot.current < 29
            && editMode) {
            return false;
        }
        else {
            return true;
        }
    }



    const loadingIconVisibility = () => {
        if (showLoadingIcon) {
            return <img id={avalibilityPgCss.loadingData} src={loadingImg}></img>
        }
    }

    const displayApprovalStatus = () => {
        if (doesEntryExist.current && !editMode) {
            return <ApprovalStatusDisplay is_Approved={isApproved} set_Edit_Mode={setEditMode} entryType="Availability" />
        }
    }



    const btnName = () => {
        if (doesEntryExist.current) {
            return "Update"
        }
        else {
            return "Submit"
        }
    }
    const selectOrResetAll = (e) => {
        if (editMode) {
            let newtimeSlotGroupList = [...timeSlotGroupList];
            let value = null;
            if (e.target.value == "select") {
                for (var x = 0; x < newtimeSlotGroupList.length; x++) {
                    for (var y = 0; y < newtimeSlotGroupList[x].timeSlotGroup.length; y++) {
                        newtimeSlotGroupList[x].timeSlotGroup[y].selected = true;
                    }
                }
                numberOfDeselectedTimeSlot.current = 0;
            } else {
                for (var x = 0; x < newtimeSlotGroupList.length; x++) {
                    for (var y = 0; y < newtimeSlotGroupList[x].timeSlotGroup.length; y++) {
                        newtimeSlotGroupList[x].timeSlotGroup[y].selected = false;
                    }
                }
                numberOfDeselectedTimeSlot.current = 30;
            }


            setTimeSlotGroupList(newtimeSlotGroupList);
        }
    }

    return (
        <React.Fragment>
            <DataContext.Provider value={
                {
                    allTimeSlots: timeSlotGroupList, reportTimeBlockSelected: selectTimeBlock,
                    editMode: editMode
                }} >
                <div className={avalibilityPgCss.centerButtons}>

                    <Button onClick={selectOrResetAll} id={avalibilityPgCss.selectAllButton} className={`${isDisabled()}`} value="select">Select All</Button>
                    <Button onClick={selectOrResetAll} id={avalibilityPgCss.resetAllButton} className={`${isDisabled()}`} value="reset">Reset All</Button>

                </div>
                <div style={{ position: 'relative' }}>
                    {loadingIconVisibility()}
                    <div className={`${avalibilityPgCss.dropDownShell} ${isDisabled()}`}>

                        <DropDownSquares weekDayName="Monday" weekdayIndex={0} />
                        <DropDownSquares weekDayName="Tuesday" weekdayIndex={1} />
                        <DropDownSquares weekDayName="Wednesday" weekdayIndex={2} />
                        <DropDownSquares weekDayName="Thursday" weekdayIndex={3} />
                        <DropDownSquares weekDayName="Friday" weekdayIndex={4} />
                        <Button id={avalibilityPgCss.submitBtn} onClick={submitData}
                            disabled={disableSubmittionBtn()}>{btnName()}</Button>
                    </div>
                    {displayApprovalStatus()}

                </div>
            </DataContext.Provider>

        </React.Fragment>);
}

export default DropDownSquareGroup;