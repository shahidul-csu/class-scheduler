import React, { useContext, useState } from 'react';
import DDSquare from './DDSquare.js';
import avalibilityPgCss from '../../styles/AvaliabilityPg.module.css'
import arrowImg from '../../images/Arrow drop down.png'
import { DataContext } from './DropDownSquareGroup.js';

const DropDownSquares =(props)=> {
    const contextData = useContext(DataContext);
    const timeSlotGroupForWeekDay = contextData.allTimeSlots[props.weekdayIndex].timeSlotGroup;
    const [isDropDownOpened, setIsDropDownOpenedState] = useState(false);

    const displayTimeslots=()=>{
        if (isDropDownOpened) {
            return <div className={avalibilityPgCss.OptionGroup}>
                {timeSlotGroupForWeekDay.map(

                    (timeSlotData,index) => { 
                        return <DDSquare key={index} timeSlotIndex={index} weekdayIndex={props.weekdayIndex}
                        isSelected={timeSlotData.selected} timeSlotName={timeSlotData.timeSlotName}/>
                })}
            </div>
        }

    }

    const rotateDropDownArrowClass = ()=>{
        if(isDropDownOpened){
            return avalibilityPgCss.arrowUpFaceUp
        }
    }

        return (
            <React.Fragment>
                <div className={avalibilityPgCss.OptionHeader} onClick={
                    ()=>setIsDropDownOpenedState(!isDropDownOpened)}>

                    <div className={avalibilityPgCss.weekDayShell}>
                        <span className={`${avalibilityPgCss.day}
                        ${avalibilityPgCss.disableSelect}`}>
                            {props.weekDayName}
                        </span>
                    </div>

                    <img className={`${avalibilityPgCss.dropDownIcon} 
                    ${rotateDropDownArrowClass()} ${avalibilityPgCss.disableSelect}`} 
                    src={arrowImg} alt="arrow"></img>
                </div>

                {displayTimeslots()}

                
            </React.Fragment>
        );
}


 
export default DropDownSquares ;