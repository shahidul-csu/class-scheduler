import React, { memo, useContext } from 'react';
import AvalibilityPgCss from '../../../styles/PreferencePg.module.css'
import { DataContext } from './DDPreferenceSquareGroup.js';

const DDSquare = (props) => {
    const contextData = useContext(DataContext);

    const squareBackgroundColor = () => {
        if (props.isAvailable) {
            if (props.currentScore === 5) {
                return AvalibilityPgCss.OptionBoxBGColorGreen;
            } else if (props.currentScore === 3) {
                return AvalibilityPgCss.OptionBoxBGColorYellow;
            } else {
                return AvalibilityPgCss.OptionBoxBGColorRed;
            }
        } else {
            return AvalibilityPgCss.OptionBoxBGColorGray;
        }
    }

    const handleTimeSlotClick = () => {
        if (contextData.editMode) {
            contextData.reportTimeBlockSelected(props.weekdayIndex,
                props.timeSlotIndex, 2);
        }

    }

    const DisableHandler = () => {
        if (!props.isAvailable) {
            return AvalibilityPgCss.disabledTimSlot
        }
        if (!contextData.editMode) {
            return AvalibilityPgCss.disabledTimSlot
        }
    }

    return (
        <React.Fragment>
            <div className={`${AvalibilityPgCss.OptionBox} ${squareBackgroundColor()} 
            ${DisableHandler()}`}
                onClick={handleTimeSlotClick}>

                <span className={`${AvalibilityPgCss.OptionName} 
                    ${AvalibilityPgCss.disableSelect}`}>
                    {props.timeSlotName}
                </span>
            </div>
        </React.Fragment>);
}

const DDSquareMemo = memo(DDSquare,
    (prevProps, nextProps) => {
        //if previous showDropDown prop is equal to the new
        // (next) showDropDown prop, dont rerender. else
        // re-render the component
        if (prevProps.currentScore === nextProps.currentScore) {
            return true; //dont re-render
        }
        return false; //re-render
    })

export default DDSquareMemo;