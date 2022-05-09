/* This file is going to contain the contents for the settings page */

import React, {useState} from "react";
import "../../styles/SettingsUsers.css";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {getUserModelConfig} from "../../network/RequestTemplates";

const SettingsUsers = () =>  {

    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")

    const addUser = () => {
        axios(getUserModelConfig("post", {}, {"username": firstName, "name": firstName, "email": email})).then(
            res => {
                console.log("created new user", res.data)
                alert("User created")
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }

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
            </div>
            </div>
            <div className="Col2">
                <div className="Right">
                    <div className="addUser">
                        <h1>Add User</h1>
                        <div className="submitUser">
                            <Form onSubmit={addUser}>
                                <Row>
                                    <Col xs={5}>
                                        <Form.Control id="first_name" placeholder="User First Name" onChange={(e) => setFirstName(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Control id="email" placeholder="User Email" onChange={(e) => setEmail(e.target.value)} />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit" className="mb-2" onClick={addUser}>Submit</Button>
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