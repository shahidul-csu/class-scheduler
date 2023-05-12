import React from 'react';
import availabilityPgCss from '../../styles/AvaliabilityPg.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const ApprovalStatusDisplay = (props) => {
    const entryType = props.entryType;
    const getApprovalStatus = () => {
        let approved = props.is_Approved.current;
        if (approved === null) {
            return <span className={availabilityPgCss.statusTagValue}>Pending..</span>
        } else {
            if (approved === true) {
                return <span className={availabilityPgCss.statusTagValue}>Approved</span>

            } else {
                return <span className={availabilityPgCss.statusTagValue}>Rejected</span>
            }
        }
    }
    const availabilityStats = () => {
        let approved = props.is_Approved.current;
        if (approved === null) {
            return availabilityPgCss.availabilityStatsPending;
        } else {
            if (approved === true) {
                return availabilityPgCss.availabilityStatsApproved;
            } else {
                return availabilityPgCss.availabilityStatsNotApproved;
            }
        }
    }
    return (

        <React.Fragment>
            <div id={availabilityStats()}>
                <span id={availabilityPgCss.statusHeading}>{entryType}</span>

                <span className={availabilityPgCss.statusTag}>Approval Status:</span>

                {getApprovalStatus()}
                <Button id={availabilityPgCss.editButton} onClick={() => props.set_Edit_Mode(true)}
                >Edit</Button>

            </div>
        </React.Fragment>);
}

export default ApprovalStatusDisplay;