import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFuncPgCSS from "../../../styles/AddFuncPg.module.css";
import axios from "axios";
import { getClassroomModelConfig } from "../../../network/RequestTemplates";

const AddClass = () => {
    const [className, setClassroomName] = useState("")
    const [capacity, setCapacity] = useState()

    const addClassroom = () => {
        axios(getClassroomModelConfig("POST", "", {classroom_name: className, capacity: +capacity},null)).then(
            res => {
                console.log("Classroom created", res.data)
                alert("Classroom Created")
                window.location.reload(true) // RELOADS PAGE
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >
        <div id={AddFuncPgCSS.pageBody}>

            <div id={AddFuncPgCSS.headerWrapper}>

                <div id={AddFuncPgCSS.heading}>
                        <span id={AddFuncPgCSS.headerText}> Add New Classroom </span>
                        
                </div>

                <p id={AddFuncPgCSS.pgInstructions} ><b>Please add a classroom below with the classroom name and the capacity of the classroom.</b></p>

            </div>

                <Form id={AddFuncPgCSS.MyForm} >
                <Form.Group className={`${AddFuncPgCSS.formGroup}`} >
                    <Form.Label className={`${AddFuncPgCSS.customLabel}`}>Classroom</Form.Label>
                    <Form.Control className={AddFuncPgCSS.customInput} type="text" placeholder="BIT321" 
                    onChange={(e) => setClassroomName(e.target.value)}/>
                </Form.Group>

                <Form.Group className={AddFuncPgCSS.formGroup} style={{float:"right"}}>
                    <Form.Label className={AddFuncPgCSS.customLabel}>Class Capacity</Form.Label>
                    <Form.Control className={AddFuncPgCSS.customInput} type="text" placeholder="Example: 80" 
                    onChange={(e) => setCapacity(e.target.value)}/>
                </Form.Group>
            </Form>

            <div id={AddFuncPgCSS.divSubmit}><Button id={AddFuncPgCSS.submitBTN} onClick={addClassroom}>Add Classroom</Button></div>
        
        </div>
        </React.Fragment>);
}
export default AddClass