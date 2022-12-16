import React, { memo, useState,useContext} from 'react';
import AvalibilityPgCss from '../../styles/AvaliabilityPg.module.css'
import { DataContext } from './DropDownSquareGroup.js';

const DDSquare = (props)=> {
    const contextData = useContext(DataContext);
    //const [isSelected, setIsSelected] = useState([props.isSelected]);

    const squareBackgroundColor = ()=>{
        return (props.isSelected)? 
        
        AvalibilityPgCss.OptionBoxBGColorGreen : AvalibilityPgCss.OptionBoxBGColorRed;
    }

    const handleTimeSlotClick = ()=>{
        if(contextData.editMode){
            contextData.reportTimeBlockSelected(props.weekdayIndex,
                props.timeSlotIndex,!props.isSelected);
        }
        
    }

    const DisableHandler = ()=>{

        if(!contextData.editMode){
        return AvalibilityPgCss.disabledTimSlot
        }
    }

        return (
        <React.Fragment>
            <div className={`${AvalibilityPgCss.OptionBox} ${squareBackgroundColor()} 
            ${DisableHandler()}`}
                onClick={handleTimeSlotClick}>

                    <span  className={`${AvalibilityPgCss.OptionName} 
                    ${AvalibilityPgCss.disableSelect}`}>
                        {props.timeSlotName}
                    </span>
            </div>
        </React.Fragment>);
}

const DDSquareMemo = memo(DDSquare,
    (prevProps,nextProps) =>{
        //if previous showDropDown prop is equal to the new
        // (next) showDropDown prop, dont rerender. else
        // re-render the component
        if(prevProps.isSelected === nextProps.isSelected){
            return true; //dont re-render
        }
        return false; //re-render
})
 
export default DDSquareMemo;