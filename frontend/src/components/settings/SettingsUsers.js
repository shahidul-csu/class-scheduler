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
                        <div className="submitUser">
                        <Form>
                        <Form.Label id="label">Add a new user </Form.Label>
                        <Row>
                            <Col xs={5}>
                            <Form.Label>First Name: </Form.Label>
                            <Form.Control placeholder="" />
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="" />
                            </Col>
                            <Col>
                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control placeholder="" />
                            <Form.Label>Password:</Form.Label>
                            <Form.Control placeholder="" />
                            </Col>
                            <Col>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control placeholder="" /> <br/>
                            <Button type="submit" className="mb-2">Submit</Button>
                            </Col>
                        </Row> <br/>
                        </Form>
                        </div>
                    </div>
                    <div className="allUsers">
                        <div className="displayUsers">
                            <h5>All users</h5>
                            {/* Needs to show different data */}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Milly</td>
                                        <td>Doe</td>
                                        <td>MDoe</td>
                                        <td>millyDoe@gmail.com</td>
                                        <td>Password 1</td>
                                    </tr>
                                    <tr>
                                        <td>Billy</td>
                                        <td>Joe</td>
                                        <td>BJoe</td>
                                        <td>billyDoe@gmail.com</td>
                                        <td>Password 2</td>
                                    </tr>
                                    <tr>
                                        <td>Lilly</td>
                                        <td>Doe2</td>
                                        <td>LDoe2</td>
                                        <td>lillyDoe@gmail.com</td>
                                        <td>Password 3</td>
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