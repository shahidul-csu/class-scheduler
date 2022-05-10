/* This file is going to contain the contents for the settings page */

import React from "react";
import "../../styles/settings/SettingsUsers.css";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const SettingsUsers = () =>  {
    return(
        <div className="SettingsUsers">
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
                    <div className="addUser">
                        <h1>Add User</h1>
                        <div className="submitUser">
                        <Form>
                        <Row>
                            <Col xs={5}>
                            <Form.Control placeholder="User First Name" />
                            </Col>
                            <Col>
                            <Form.Control placeholder="User Email" />
                            </Col>
                            <Col xs="auto">
                            <Button type="submit" className="mb-2">
                                Submit
                            </Button>
                            </Col>
                        </Row>
                        </Form>
                        </div>
                    </div>
                    <div className="allUsers">
                        <h1>All Users</h1>
                        <div className="displayUsers">

                            {/* Needs to show different data */}

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Milly</td>
                                        <td>Doe</td>
                                        <td>millyDoe@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Billy</td>
                                        <td>Joe</td>
                                        <td>billyDoe@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Lilly</td>
                                        <td>Doe2</td>
                                        <td>lillyDoe@gmail.com</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsUsers;