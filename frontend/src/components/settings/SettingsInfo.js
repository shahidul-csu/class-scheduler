/* This file is going to contain the contents for the general account settings page */

import React from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import "../../styles/settings/SettingsInfo.css";

const SettingsInfo = () =>  {
    return(
        <div className="SettingsInfo">
        <div className="Row">
            <div className="Col1">
            <div className="NavBar">
                <div className="Login">
                    <a href="/settings">Login Information</a>
                </div>
                <div className="UserManagement">
                    <a href="/settingsUser">User Management</a>
                </div>
                <div className="AddCourse">
                    <a href="/AddCourse">Add Course</a>
                </div>
                <div className="AddClassroom">
                    <a href="/AddClassroom">Add Classroom</a>
                </div>
            </div>
            </div>
            <div className="Col2">
                <div className="Right">
                    <CardGroup>
                        <Card className="UpdatePassword">
                            <Card.Body>
                            <Card.Title>Update Password</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Current Password:</Form.Label>
                                    <Form.Control type="primary"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control type="password"/> 
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Re-Enter Password:</Form.Label>
                                    <Form.Control type="password"/>
                                </Form.Group>
                                    <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin" }}> Update </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                        
                        <Card className="GeneralInformation">
                            <Card.Body>
                            <Card.Title>General Information</Card.Title>
                            <Card.Text style={{fontStyle: 'italic'}}>Will be used as your display name</Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="primary"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="lname"/> 
                                </Form.Group>
                                    <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin" }}> Update </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsInfo;