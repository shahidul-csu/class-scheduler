import React, { createContext, useEffect, useRef, useState } from 'react';
import avalibilityPgCss from '../../styles/AvaliabilityPg.module.css'
import DropDownSquares from './DropDownSquares';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ROUTER from '../../network/Router';
import { getGenericAuthModelConfig} from '../../network/RequestTemplates';
import loadingImg from '../../images/loading.png'
import ApprovalStatusDisplay from '../ApprovalStatusDisplay';

export const DataContext = createContext()

const DeafultTimeSlots=()=> [
    {timeSlotName:'8AM-10AM', selected:true},{timeSlotName:'10AM-12PM', selected:true},
    {timeSlotName:'12PM-2PM', selected:true},{timeSlotName:'2PM-4PM', selected:true},
    {timeSlotName:'4PM-6PM', selected:true}, {timeSlotName:'6PM-8PM', selected:true}]

const FalseTimeSlots = ()=> [
    {timeSlotName:'8AM-10AM', selected:false},{timeSlotName:'10AM-12PM', selected:false},
    {timeSlotName:'12PM-2PM', selected:false},{timeSlotName:'2PM-4PM', selected:false},
    {timeSlotName:'4PM-6PM', selected:false}, {timeSlotName:'6PM-8PM', selected:false}]
    // set all time slot selected to false


    

const DropDownSquareGroup = (props)=>{

    //prevents the user from sumbiting if the user doesnt deselect any of the 
    //timeslots
    const numberOfDeselectedTimeSlote = useRef(0);
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
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        ]);


        useEffect(async ()=>{
            //if a dropdown Option has been selected
            doesEntryExist.current = false;
            setIsDoneFetching(false);

            if(props.selectedSemesterById !="0"){


                FetchExistingAvaliabilityData();
            }
            

        },[props.selectedSemesterById])


        const selectTimeBlock=(weekdayIndex,timeSlotIndex, isselected)=>{
            //the DDSqure(Timeslot squares) use this function to 
            //report to this class what DDSuare has been selected.
            let newtimeSlotGroupList = [...timeSlotGroupList];

            newtimeSlotGroupList[weekdayIndex].
            timeSlotGroup[timeSlotIndex].selected = isselected;

            (isselected)? numberOfDeselectedTimeSlote.current-- : 
            numberOfDeselectedTimeSlote.current++;

            setTimeSlotGroupList(newtimeSlotGroupList);
        }

        const submitData= ()=>{

            if(numberOfDeselectedTimeSlote.current !==0 && numberOfDeselectedTimeSlote.current !==30
                && !doesEntryExist.current){
                props.SubmitAvaliability(timeSlotGroupList);
            }
            else{
                if(doesEntryExist.current){
                    alert('Update Function not implemented!')
                }
            }
        }

        //used to diable the slots when a semester has not been selected
        //or when fetching the avaliability Data
        const isdisAbled= ()=>{
            if(props.disabled || !isDoneFetching){
                
                return avalibilityPgCss.disabled;
            }
            else{
                
                return avalibilityPgCss.notDisabled;
            }
        }

     

        const disableSubmittionBtn=()=>{
            if(numberOfDeselectedTimeSlote.current >0 && numberOfDeselectedTimeSlote.current < 30 
                && editMode){
                return false;
            }
            else{
                return true;
            }
        }

        //gets the avaliability entry previously submitted by the user for the 
        //specifed semester
        const FetchExistingAvaliabilityData = async()=>{

            setShowLoadingIcon(true);
            
                await axios(getGenericAuthModelConfig( "GET", {'semesterId': props.selectedSemesterById,
                 'userId': localStorage.getItem('userId')}, {},
                    localStorage.getItem('token'), ROUTER.api.getAvaliabilityData)).then(
                        res => {
                            
                            if(res.data.data.length > 0){
                                doesEntryExist.current = true;
                                setEditMode(false); // dont let timeslot be clickable
                                updateVisualDetails(res.data.data);
                            }
                            else{
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

        const updateVisualDetails = (data)=>{
            let newtimeSlotGroupList = [
                { timeSlotGroup: FalseTimeSlots()},
                { timeSlotGroup: FalseTimeSlots()},
                { timeSlotGroup: FalseTimeSlots()},
                { timeSlotGroup: FalseTimeSlots()},
                { timeSlotGroup: FalseTimeSlots()},
            ];


            for(var x=0; x < data.length; x++){
                newtimeSlotGroupList[data[x].week_day_id-1].
                timeSlotGroup[data[x].day_time_id -1].selected =true;
            }
            
            numberOfDeselectedTimeSlote.current = 30-data.length;
            
            // lets us know if the fetched timeslots is approved
            isApproved.current = data[0].approved; 

            setTimeSlotGroupList(newtimeSlotGroupList);
            
        }  

        


        const resetToDefaultTimeSlots=()=>{
            let newtimeSlotGroupList = [
                { timeSlotGroup: DeafultTimeSlots()},
                { timeSlotGroup: DeafultTimeSlots()},
                { timeSlotGroup: DeafultTimeSlots()},
                { timeSlotGroup: DeafultTimeSlots()},
                { timeSlotGroup: DeafultTimeSlots()},
            ];

            numberOfDeselectedTimeSlote.current = 0; // helps disable the submited button
            setTimeSlotGroupList(newtimeSlotGroupList);
        }

        const loadingIconVisibility= ()=>{
            if(showLoadingIcon){
                return <img id={avalibilityPgCss.loadingData} src={loadingImg}></img>
            }
        }

        const displayApprovalStatus = ()=>{
            if(doesEntryExist.current && !editMode){
                return <ApprovalStatusDisplay is_Approved={isApproved} set_Edit_Mode={setEditMode} />
            //     <div id={avalibilityPgCss.avaliabilityStats}>
            //     <span id={avalibilityPgCss.statusHeading}>Avaliability</span>

            //     <span className={avalibilityPgCss.statusTag}>Approval Status:</span>
                
            //     {getApprovalStatus()}
            //     <img id={avalibilityPgCss.editButton} src={EditButtonImg} onClick={()=>setEditMode(true)}
            //     ></img>

            // </div>
            }
        }

        

        const btnName = ()=>{
            if(doesEntryExist.current){
                return "Update"
            }
            else{
                return "Submit"
            }
        }

        return (
        <React.Fragment>
            <DataContext.Provider value={
                {allTimeSlots: timeSlotGroupList, reportTimeBlockSelected:selectTimeBlock,
                editMode: editMode}} >

            <div style={{position: 'relative'}}>
                {loadingIconVisibility()}
                <div className={`${avalibilityPgCss.dropDownShell} ${isdisAbled()}`}>
                
                    <DropDownSquares weekDayName="Monday"    weekdayIndex={0}/>
                    <DropDownSquares weekDayName="Tuesday"   weekdayIndex={1}/>
                    <DropDownSquares weekDayName="Wednesday" weekdayIndex={2}/>
                    <DropDownSquares weekDayName="Thursday"  weekdayIndex={3}/>
                    <DropDownSquares weekDayName="Friday"    weekdayIndex={4}/>
                    <Button id={avalibilityPgCss.submitBtn} onClick={submitData} 
                        disabled={disableSubmittionBtn()}>{btnName()}</Button>
                </div>
                {displayApprovalStatus()}
                
            </div>
            </DataContext.Provider>

        </React.Fragment>);
}
 
export default DropDownSquareGroup;