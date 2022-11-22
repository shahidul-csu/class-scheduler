import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import pageCss from "../../../styles/CourseClassroom.module.css"
import pageheaderIcon from "../../../images/UserManagement.png"
import Form from 'react-bootstrap/Form';

const CourseClassroom = () => {
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
                    <Form.Control className={pageCss.customInput} type="email"  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup}>
                    <Form.Label className={pageCss.customLabel}>Last Name</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>

                <Form.Group className={pageCss.formGroup} >
                    <Form.Label className={pageCss.customLabel}>Email</Form.Label>
                    <Form.Control className={pageCss.customInput}type="email"  />
                </Form.Group>
            </Form>
            <div id={pageCss.divSubmit}><Button id={pageCss.submitBTN}>Add User</Button></div>
            
            </div>
        </React.Fragment>);
}
 
export default AddUserPg ;