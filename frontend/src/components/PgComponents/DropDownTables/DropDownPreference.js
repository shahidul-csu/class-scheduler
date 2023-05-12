import React, { useContext, useEffect, useState } from 'react';
import PageCss from "../../../styles/ApproveDeny.module.css";
import arrowImg from '../../../images/Arrow drop down.png'
import Button from 'react-bootstrap/Button';
import rejectedImg from '../../../images/rejected.png';
import approvedImg from '../../../images/approved.png';
import emptyImg from '../../../images/empty-set.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { getGenericAuthModelConfig, getParameterDataModelConfig } from '../../../network/RequestTemplates';
import axios from "axios";
import ROUTER from '../../../network/Router'
import { DataContext } from './DDGroupApproveDeny';

const DropDownPreference = (props) => {
    const contextData = useContext(DataContext);
    const selectedTimeSlots = contextData.preferenceTimeSlots;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const parameterIds = contextData.preferenceParameterIds;
    const isApproved = contextData.preferenceStatus.current;
    const timeSlots = [0, 1, 2, 3, 4, 5];
    const [isDropDownOpened, setIsDropDownOpenedState] = useState(false);
    const rotateDropDownArrowClass = () => {
        if (isDropDownOpened) {
            return PageCss.arrowUpFaceUp
        }
    }

    const checkIfSelected = (day, time) => {
        if (selectedTimeSlots[day].timeSlotGroup[time].selected) {
            return PageCss.tableSelected;
        } else {
            return PageCss.tableNotSelected;
        }
    }
    const handleChange = async (event) => {
        if (parameterIds.length === 0) {
            alert("User has no preference entries")
        } else {
            let approve = null;
            let message = null;

            if (event.target.value === "approve") {
                approve = true;
                message = "Preference entries have been approved"
            } else {
                approve = false
                message = "Preference entries have been rejected"
            }
            console.log(parameterIds + " " + approve)
            for (let i = 0; i < parameterIds.length; i++) {
                await axios(getGenericAuthModelConfig("PUT", {}, { "id": parameterIds[i], "approved": approve },
                    localStorage.getItem('token'), ROUTER.api.parameterData)).then(
                        res => {
                            console.log(message)
                        }

                    ).catch(
                        err => {
                            alert(err)
                            console.log(err)
                        }
                    )
            }
            alert(message)

        }

    }
    const displayScheduleTable = () => {
        if (isDropDownOpened) {
            return <div className={PageCss.OptionGroup}>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>8am-10am</th>
                                <th>10am-12pm</th>
                                <th>12pm-2pm</th>
                                <th>2pm-4pm</th>
                                <th>4pm-6pm</th>
                                <th>6pm-8pm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day, dayIndex) => (
                                <tr key={dayIndex}>
                                    <td>{day}</td>
                                    {timeSlots.map((timeSlot, index) => (
                                        <td key={index} className={`${checkIfSelected(dayIndex, timeSlot)}`}> </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={PageCss.buttonContainer}>
                        <div className={PageCss.buttonContainer}>
                            <Button onClick={handleChange} className={PageCss.DenyButton} value="deny"> Deny </Button>
                            <Button onClick={handleChange} className={PageCss.ApproveButton} value="approve"> Approve </Button>
                        </div>
                    </div>

                </div>

            </div>
        }
    }
    const hasEntries = () => {
        if (parameterIds.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    const statusImage = () => {
        if (isApproved == null) {
            return emptyImg;
        } else {
            if (isApproved) {
                return approvedImg;
            } else {
                return rejectedImg;
            }

        }

    }
    return (
        <React.Fragment>
            <div className={PageCss.OptionHeader} onClick={() => setIsDropDownOpenedState(!isDropDownOpened)}>
                <img className={PageCss.statusIcon} src={statusImage()}></img>
                <div className={PageCss.entryTypeShell}>
                    <span className={`${PageCss.type} ${PageCss.disableSelect}`}>
                        {props.entryTypeName}
                    </span>
                </div>
                <img className={`${PageCss.dropDownIcon} 
                    ${rotateDropDownArrowClass()} ${PageCss.disableSelect}`}
                    src={arrowImg} alt="arrow"></img>
            </div>
            {displayScheduleTable()}
        </React.Fragment>
    );
}

export default DropDownPreference;