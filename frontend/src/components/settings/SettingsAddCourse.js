/* This file is going to contain the form for admin to add a course */

import React, {useState} from "react";
import "../../styles/settings/SettingsAddCourse.css";
import { Form, FormGroup, FieldGroup, CardGroup } from "react-bootstrap"; 
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {getClassroomModelConfig, getCourseModelConfig, getLoginConfig} from "../../network/RequestTemplates";


const SettingsAddCourse = () =>  {

    const [course, setCourse] = useState('')
    const [capacity, setCapacity] = useState(0)
    const [units, setUnits] = useState()
    const [meetingNumber, setMeetingNumber] = useState()
    const [token, setToken] = useState()

    const addCourse = () => {

        (axios(getLoginConfig({"username": "alex", "password": "alex"})).then(
            res => {
                setToken(res.data.token)
                alert(res.data.token)
            }
        ).catch(
            err => {
                alert("Incorrect Username or Password")
                console.log(err)
            }
        )).then(
            axios(getCourseModelConfig( "post", {}, {"course": course, 'capacity': capacity, 'units': units, 'meetingNumber': meetingNumber}, token)).then(
                res => {
                    console.log("created new course", res.data)
                    alert("Course created")
                }
            ).catch(
                err => {
                    alert(err)
                    console.log(err)
                }
            )
        )
    }

    return(
        <div className="SettingsAddCourse">
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
                <CardGroup id="cardGroup">
                    <Card className="AddCourseForm">
                        <Card.Body>
                            {/*<Form onSubmit={addCourse}>*/}
                                <Row>
                                    <Col>
                                    <Form.Group>
                                        <Form.Label>Course Title: </Form.Label>
                                        <Form.Control type="text" placeholder="CST321" onChange={(e) => setCourse(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group> <br/>
                                        <Form.Label>Student capacity: </Form.Label>
                                        <Form.Control type="text" placeholder="1 - 120" onChange={(e) => setCapacity(parseInt(e.target.value))}/>
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group>
                                        <Form.Label>Units: </Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setUnits(parseInt(e.target.value))}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group> <br/>
                                        <Form.Label>Meets how many times a week: </Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setMeetingNumber(parseInt(e.target.value))}>
                                            <option>0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Form.Select>
                                    </Form.Group>
                                    </Col>
                                    <br/>
                                    <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin", marginTop: '10px'}} onClick={addCourse}> Add New Course </Button>
                                </Row>
                            {/*</Form>*/}
                        </Card.Body> <br/>

                    </Card>
                </CardGroup>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsAddCourse;