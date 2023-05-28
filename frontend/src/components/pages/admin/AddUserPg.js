import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/AddUserPg.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { getSignUpConfig } from "../../../network/RequestTemplates";
import { Dropdown, Row, Col } from 'react-bootstrap';






const AddUserPg = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [is_staff, setIs_staff] = useState(null);
    // const [is_admin, setIs_admin] = useState(null);

    const addUser = () => {

        const isStaffValue = is_staff === "Faculty";
        const isAdminValue = true;

        if (isStaffValue) {
            axios(getSignUpConfig({
                is_superuser: false,
                username: firstName, password: firstName, email: email,
                first_name: firstName, last_name: lastName, is_staff: isStaffValue, is_active: true
            })).then(
                res => {
                    console.log("created new faculty member", res.data)
                    alert("Faculty created")
                    window.location.reload(true) // RELOADS PAGE
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        } else {
            axios(getSignUpConfig({
                is_superuser: isAdminValue,
                username: firstName, password: firstName, email: email,
                first_name: firstName, last_name: lastName, is_staff: false, is_active: true
            })).then(
                res => {
                    console.log("created new administrator user", res.data)
                    alert("Administrator created")
                    window.location.reload(true) // RELOADS PAGE
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        }

        // axios(getSignUpConfig({
        //     is_superuser: isAdminValue,
        //     username: firstName, password: firstName, email: email,
        //     first_name: firstName, last_name: lastName, is_staff: isStaffValue, is_active: true
        // })).then(
        //     res => {
        //         console.log("created new user", res.data)
        //         alert("User created")
        //         window.location.reload(true) // RELOADS PAGE
        //     }
        // ).catch(
        //     err => {
        //         alert(err)
        //         console.log(err)
        //     }
        // )
    }
    return (<React.Fragment >
        <div id={pageCss.pageBody}>
            <div id={pageCss.headerWrapper}>
                <div id={pageCss.heading}>
                    <span id={pageCss.headerText} >Add New User </span>
                    <img id={pageCss.PGIcon} src={pageheaderIcon} alt="UserManagementIcon"
                        style={{ height: "25px", width: "25px" }} />

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
                        placeholder="User First Name" onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Last Name</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email"
                        placeholder="User Last Name" onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Email</Form.Label>
                    <Form.Control className={pageCss.customInput} type="email"
                        placeholder="User Email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Role?</Form.Label>
                    <Dropdown onSelect={value => setIs_staff(value)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {is_staff || 'Select an option'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                            <Dropdown.Item eventKey="Faculty">Faculty</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN} onClick={addUser}>Add User</Button></div>

        </div>
    </React.Fragment>);
}

export default AddUserPg;