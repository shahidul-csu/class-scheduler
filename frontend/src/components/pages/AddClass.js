import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingHeader from "../LandingHeader";
import AddFuncPg from "../../styles/AddFuncPg.module.css";



const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >         <LandingHeader index = {[1,2,3]}/>
        <div id={AddFuncPg.pageBody}>

            <div id={AddFuncPg.headerWrapper}>

                <div id={AddFuncPg.heading}>
                        <span id={AddFuncPg.headerText}> Add New Classroom </span>
                        
                </div>

                <p id={AddFuncPg.pgInstructions} ><b>Please add a classroom below with the classroom name and the capacity of the classroom.</b></p>

            </div>

                <Form id={AddFuncPg.MyForm} >
                <Form.Group className={`${AddFuncPg.formGroup}`} >
                    <Form.Label className={`${AddFuncPg.customLabel}`}>Classroom</Form.Label>
                    <Form.Control className={AddFuncPg.customInput} type="email"  />
                </Form.Group>

                <Form.Group className={AddFuncPg.formGroup} style={{float:"right"}}>
                    <Form.Label className={AddFuncPg.customLabel}>Class Capacity</Form.Label>
                    <Form.Control className={AddFuncPg.customInput}type="email"  />
                </Form.Group>
            </Form>

            <div id={AddFuncPg.divSubmit}><Button id={AddFuncPg.submitBTN}>Add Classroom</Button></div>
        
        </div>
        </React.Fragment>);
}
export default AddClass