import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/AddUserPg.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {  getSignUpConfig} from "../../../network/RequestTemplates";



const AddUserPg = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const addUser = () => {

        axios(getSignUpConfig({username: firstName, password: firstName, email: email, 
            first_name:firstName, last_name:lastName, is_staff: true, is_active: true })).then(
            res => {
                console.log("created new user", res.data)
                alert("User created")
                window.location.reload(true) // RELOADS PAGE
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }
        return (<React.Fragment >
            <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Add New User </span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon" 
                    style={{height: "25px", width:"25px"}}/>

                </div>


                <div id={pageCss.myButton} >
                    <Button id={pageCss.ULButton}>User List</Button>
                </div>
                
            </div>
            <p id={pageCss.pgInstructions} ><b>Please add a user below with the first name, last name, and email of the user.</b></p>

            <Form id={pageCss.MyForm} >
                {/* use `${pageCss.formGroup} ${pageCss.formGroup} 
                testcss`  for using multiple css */}
                <Form.Group className={`${pageCss.formGroup}`} >
                    <Form.Label className={`${pageCss.customLabel}`}>First Name</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email" 
                    placeholder="User First Name" onChange={(e) => setFirstName(e.target.value)}  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Last Name</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"
                    placeholder="User Last Name" onChange={(e) => setLastName(e.target.value)}  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Email</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email" 
                    placeholder="User Email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN} onClick={addUser}>Add User</Button></div>
            
            </div>
        </React.Fragment>);
}
 
export default AddUserPg ;