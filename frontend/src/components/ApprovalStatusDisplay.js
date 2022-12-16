import React, { Component } from 'react';
import avalibilityPgCss from '../styles/AvaliabilityPg.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const ApprovalStatusDisplay= (props)=>{
    
    const getApprovalStatus= ()=>{
        if(props.is_Approved){
            return <span className={avalibilityPgCss.statusTagValue}>Pending ...</span>
        }
        else{
            return <span className={avalibilityPgCss.statusTagValue}>Approved</span>
        }
    }

        return (
            
        <React.Fragment>
            <div id={avalibilityPgCss.avaliabilityStats}>
                <span id={avalibilityPgCss.statusHeading}>Avaliability</span>

                <span className={avalibilityPgCss.statusTag}>Approval Status:</span>
                
                {getApprovalStatus()}
                <Button id={avalibilityPgCss.editButton} onClick={()=>props.set_Edit_Mode(true)}
                >Edit</Button>

            </div>
        </React.Fragment>);
}
 
export default ApprovalStatusDisplay;