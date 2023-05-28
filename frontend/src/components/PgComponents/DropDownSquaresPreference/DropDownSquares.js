import React, { useContext, useState } from 'react';
import DDSquare from './DDSquare.js';
import PageCss from '../../../styles/PreferencePg.module.css'
import arrowImg from '../../../images/Arrow drop down.png'
import { DataContext } from './DDPreferenceSquareGroup.js';



const DropDownSquares = (props) => {
    const contextData = useContext(DataContext);
    const timeSlotGroupForWeekDay = contextData.allTimeSlots[props.weekdayIndex].timeSlotGroup;
    const [isDropDownOpened, setIsDropDownOpenedState] = useState(false);




    const displayTimeslots = () => {
        if (isDropDownOpened) {
            return <div className={PageCss.OptionGroup}>
                {timeSlotGroupForWeekDay.map(

                    (timeSlotData, index) => {
                        return <DDSquare key={index} timeSlotIndex={index} weekdayIndex={props.weekdayIndex} isAvailable={timeSlotData.isAvailable}
                            currentScore={timeSlotData.currentScore} timeSlotName={timeSlotData.timeSlotName} />
                    })}
            </div>
        }

    }


    const rotateDropDownArrowClass = () => {
        if (isDropDownOpened) {
            return PageCss.arrowUpFaceUp
        }
    }


    return (
        <React.Fragment>
            <div className={PageCss.OptionHeader} onClick={
                () => setIsDropDownOpenedState(!isDropDownOpened)}>

                <div className={PageCss.weekDayShell} >
                    <span className={`${PageCss.day}
                        ${PageCss.disableSelect}`}>
                        {props.weekDayName}
                    </span>
                </div>

                <img className={`${PageCss.dropDownIcon} 
                    ${rotateDropDownArrowClass()} ${PageCss.disableSelect}`}
                    src={arrowImg} alt="arrow" ></img>
            </div>




            {displayTimeslots()}


        </React.Fragment>
    );
}



export default DropDownSquares;