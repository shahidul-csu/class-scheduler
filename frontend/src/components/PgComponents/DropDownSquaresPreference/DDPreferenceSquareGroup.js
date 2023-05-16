import React, { createContext, useEffect, useRef, useState } from 'react';
import PageCss from '../../../styles/PreferencePg.module.css'
import DropDownSquares from '../DropDownSquaresPreference/DropDownSquares.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ROUTER from '../../../network/Router';
import { getGenericAuthModelConfig } from '../../../network/RequestTemplates';
import loadingImg from '../../../images/loading.png'
import ApprovalStatusDisplay from '../ApprovalStatusDisplay';

export const DataContext = createContext()


const DayTimeSlots = () => [
    { timeSlotName: '8AM-10AM', currentScore: 0, previousScore: 0 }, { timeSlotName: '10AM-12PM', currentScore: 0, previousScore: 0 },
    { timeSlotName: '12PM-2PM', currentScore: 0, previousScore: 0 }, { timeSlotName: '2PM-4PM', currentScore: 0, previousScore: 0 },
    { timeSlotName: '4PM-6PM', currentScore: 0, previousScore: 0 }, { timeSlotName: '6PM-8PM', currentScore: 0, previousScore: 0 }]

const DDPrefenceSquareGroup = (props) => {

    const [showLoadingIcon, setShowLoadingIcon] = useState(false)
    const [isDoneFetching, setIsDoneFetching] = useState(false);


    // specifies if the displayed timeslots
    // is from the dataBase are not.
    const doesEntryExist = useRef(false);

    // if the displyed timeslot came from the 
    // dataBase we use this to activate or deactivate
    //each time slot.
    const [editMode, setEditMode] = useState(false);

    //if the dislayed info is old,
    // this lets us know if the avaliability
    // is approved or declined
    const isApproved = useRef(true);

    const [timeSlotGroupList, setTimeSlotGroupList] = useState([
        { timeSlotGroup: DayTimeSlots() },//Monday
        { timeSlotGroup: DayTimeSlots() },//Tuesday
        { timeSlotGroup: DayTimeSlots() },//Friday
        { timeSlotGroup: DayTimeSlots() },//Thursday
        { timeSlotGroup: DayTimeSlots() },//Friday
    ]);

    //fetch preference entries
    useEffect(() => {
        async function FetchExistingData() {
            setShowLoadingIcon(true);
            await axios(getGenericAuthModelConfig("GET", {
                'semesterId': props.selectedSemesterId,
                'id': localStorage.getItem('userId')
            }, {},
                localStorage.getItem('token'), ROUTER.api.getPreferenceData)).then(
                    res => {
                        if (res.data.data.length > 0) {
                            doesEntryExist.current = true;
                            setEditMode(false);
                            updateVisualDetails(res.data.data);
                        } else {
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

        function updateVisualDetails(data) {
            let newTimeSlotGroupList = [
                { timeSlotGroup: DayTimeSlots() },//Monday
                { timeSlotGroup: DayTimeSlots() },//Tuesday
                { timeSlotGroup: DayTimeSlots() },//Friday
                { timeSlotGroup: DayTimeSlots() },//Thursday
                { timeSlotGroup: DayTimeSlots() },//Friday
            ];
            for (let x = 0; x < data.length; x++) {
                newTimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].currentScore = data[x].score;
                newTimeSlotGroupList[data[x].week_day_id - 1].timeSlotGroup[data[x].day_time_id - 1].previousScore = data[x].score;
            }
            console.log(newTimeSlotGroupList);
            setTimeSlotGroupList(newTimeSlotGroupList);
        }
        function resetToDefaultTimeSlots() {
            let newTimeSlotGroupList = [
                { timeSlotGroup: DayTimeSlots() },//Monday
                { timeSlotGroup: DayTimeSlots() },//Tuesday
                { timeSlotGroup: DayTimeSlots() },//Friday
                { timeSlotGroup: DayTimeSlots() },//Thursday
                { timeSlotGroup: DayTimeSlots() },//Friday
            ];
            for (let x = 0; x < newTimeSlotGroupList.length; x++) {
                for (let y = 0; y < newTimeSlotGroupList[x].timeSlotGroup.length; y++) {
                    newTimeSlotGroupList[x].timeSlotGroup[y].currentScore = 1;
                }

            }
            setTimeSlotGroupList(newTimeSlotGroupList);
            console.log(timeSlotGroupList);
        }

        doesEntryExist.current = false;
        setIsDoneFetching(false);
        if (props.selectedSemesterId !== "0") {

            FetchExistingData();
        }
    }, [props.selectedSemesterId])


    const selectTimeBlock = (weekdayIndex, timeSlotIndex, score) => {
        //the DDSqure(Timeslot squares) use this function to 
        //report to this class what DDSuare has been selected.
        let newtimeSlotGroupList = [...timeSlotGroupList];

        newtimeSlotGroupList[weekdayIndex].timeSlotGroup[timeSlotIndex].currentScore += score;
        if (newtimeSlotGroupList[weekdayIndex].timeSlotGroup[timeSlotIndex].currentScore > 5) {
            newtimeSlotGroupList[weekdayIndex].timeSlotGroup[timeSlotIndex].currentScore = 1;
        }

        setTimeSlotGroupList(newtimeSlotGroupList);
    }

    const submitData = () => {
        let isNewEntry = null;
        if (!doesEntryExist.current) {
            isNewEntry = true;
            props.SubmitPreference(timeSlotGroupList, isNewEntry);
        } else if (doesEntryExist.current) {
            isNewEntry = false;
            props.SubmitPreference(timeSlotGroupList, isNewEntry);
        }
    }

    //used to diable the slots when a semester has not been selected
    //or when fetching the avaliability Data
    const isDisabled = () => {
        if (props.disabled || !isDoneFetching) {
            return PageCss.disabled;
        }
        else {
            return PageCss.notDisabled;
        }
    }



    const disableSubmittionBtn = () => {
        if (editMode) {
            return false;
        } else {
            return true;
        }
    }
    const loadingIconVisibility = () => {
        if (showLoadingIcon) {
            return <img id={PageCss.loadingData} src={loadingImg}></img>
        }
    }

    const displayApprovalStatus = () => {
        if (doesEntryExist.current && !editMode) {
            return <ApprovalStatusDisplay is_Approved={isApproved} set_Edit_Mode={setEditMode} entryType="Preference" />
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
            if (e.target.value === "select") {
                for (let x = 0; x < newtimeSlotGroupList.length; x++) {
                    for (let y = 0; y < newtimeSlotGroupList[x].timeSlotGroup.length; y++) {
                        if (newtimeSlotGroupList[x].timeSlotGroup[y].currentScore !== 0) {
                            newtimeSlotGroupList[x].timeSlotGroup[y].currentScore = 5;
                        }
                    }
                }

            } else {
                for (let x = 0; x < newtimeSlotGroupList.length; x++) {
                    for (let y = 0; y < newtimeSlotGroupList[x].timeSlotGroup.length; y++) {
                        if (newtimeSlotGroupList[x].timeSlotGroup[y].currentScore !== 0) {
                            newtimeSlotGroupList[x].timeSlotGroup[y].currentScore = 1;
                        }
                    }
                }

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
                <div className={PageCss.centerButtons}>

                    <Button onClick={selectOrResetAll} id={PageCss.selectAllButton} className={`${isDisabled()}`} value="select">Select All</Button>
                    <Button onClick={selectOrResetAll} id={PageCss.resetAllButton} className={`${isDisabled()}`} value="reset">Reset All</Button>

                </div>
                <div style={{ position: 'relative' }}>
                    {loadingIconVisibility()}
                    <div className={`${PageCss.dropDownShell} ${isDisabled()}`}>

                        <DropDownSquares weekDayName="Monday" weekdayIndex={0} />
                        <DropDownSquares weekDayName="Tuesday" weekdayIndex={1} />
                        <DropDownSquares weekDayName="Wednesday" weekdayIndex={2} />
                        <DropDownSquares weekDayName="Thursday" weekdayIndex={3} />
                        <DropDownSquares weekDayName="Friday" weekdayIndex={4} />
                        <Button id={PageCss.submitBtn} onClick={submitData}
                            disabled={disableSubmittionBtn()}>{btnName()}</Button>
                    </div>
                    {displayApprovalStatus()}

                </div>
            </DataContext.Provider>

        </React.Fragment>);
}

export default DDPrefenceSquareGroup;