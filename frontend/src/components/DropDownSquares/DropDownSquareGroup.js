import React, { createContext, useEffect, useRef, useState } from 'react';
import avalibilityPgCss from '../../styles/AvaliabilityPg.module.css'
import DropDownSquares from './DropDownSquares';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DataContext = createContext()

const DeafultTimeSlots=()=> [
    {timeSlotName:'8AM-10AM', selected:true},{timeSlotName:'10AM-12PM', selected:true},
    {timeSlotName:'12PM-2PM', selected:true},{timeSlotName:'2PM-4PM', selected:true},
    {timeSlotName:'4PM-6PM', selected:true}, {timeSlotName:'6PM-8PM', selected:true}]

    

const DropDownSquareGroup = (props)=>{
    //prevents the user from sumbiting if the user doesnt deselect any of the 
    //timeslots
    const numberOfDeselectedTimeSlote = useRef(0); 

    const [timeSlotGroupList, setTimeSlotGroupList] = useState([
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        { timeSlotGroup: DeafultTimeSlots() },
        ]);
    

        const selectTimeBlock=(weekdayIndex,timeSlotIndex, isselected)=>{
            let newtimeSlotGroupList = [...timeSlotGroupList];

            newtimeSlotGroupList[weekdayIndex].
            timeSlotGroup[timeSlotIndex].selected = isselected;

            (isselected)? numberOfDeselectedTimeSlote.current-- : 
            numberOfDeselectedTimeSlote.current++;

            setTimeSlotGroupList(newtimeSlotGroupList);
        }

        const submitData= ()=>{
            if(numberOfDeselectedTimeSlote.current !==0 && numberOfDeselectedTimeSlote.current !==30){
                props.SubmitAvaliability(timeSlotGroupList);
            }
        }

        //used to diable the slots when a semester has not been selected
        const isdisAbled= ()=>{
            if(props.disabled){

                return avalibilityPgCss.disabled;
            }
            else{
                return avalibilityPgCss.notDisabled;
            }
        }

     

        const disableSubmittionBtn=()=>{
            if(numberOfDeselectedTimeSlote.current >0 && numberOfDeselectedTimeSlote.current < 30){
                return false;
            }
            else{
                return true;
            }
        }

        
        


        return (
        <React.Fragment>
            <DataContext.Provider value={
                {allTimeSlots: timeSlotGroupList, reportTimeBlockSelected:selectTimeBlock}} >
            
            <div className={`${avalibilityPgCss.dropDownShell} ${isdisAbled()}`}>
                <DropDownSquares weekDayName="Monday"    weekdayIndex={0}/>
                <DropDownSquares weekDayName="Tuesday"   weekdayIndex={1}/>
                <DropDownSquares weekDayName="Wednesday" weekdayIndex={2}/>
                <DropDownSquares weekDayName="Thursday"  weekdayIndex={3}/>
                <DropDownSquares weekDayName="Friday"    weekdayIndex={4}/>
                <Button id={avalibilityPgCss.submitBtn} onClick={submitData} 
                    disabled={disableSubmittionBtn()}>Submit</Button>
            </div>
            </DataContext.Provider>

        </React.Fragment>);
}
 
export default DropDownSquareGroup;