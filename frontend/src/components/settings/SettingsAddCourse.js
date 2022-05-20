/* This file is going to contain the form for admin to add a course */

import React, {useEffect, useState} from "react";
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

    const addCourse = async () => {
        axios(getCourseModelConfig( "post", {}, {"name": course, 'units': units, 'number_per_week': meetingNumber, 'capacity': capacity}, token)).then(
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
    }

    const getToken = async () => {
        axios(getLoginConfig({"username": "alex", "password": "alex"})).then(
            res => {
                setToken(res.data.token)
                console.log(token)
            }
        ).catch(
            err => {
                alert("Incorrect Username or Password")
                console.log(err)
            }
        )
    }

    const foo = async () => {
        // (await getToken()).then(
        //     console.log("token is ", token),
        //     addCourse()
        // )
        // console.log('outside fuction ')
        await getToken()
        await addCourse()
    }

    useEffect(() => {

    })

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
                                    <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin", marginTop: '10px'}} onClick={foo}> Add New Course </Button>
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