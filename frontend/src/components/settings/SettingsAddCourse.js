/* This file is going to contain the form for admin to add a course */

import React from "react";
import "../../styles/settings/SettingsAddCourse.css";
import { Form, FormGroup, FieldGroup, CardGroup } from "react-bootstrap"; 
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const SettingsAddCourse = () =>  {
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
                            <Form>
                            <Row>
                                <Col>
                                <Form.Group>
                                    <Form.Label>Course Title: </Form.Label>
                                    <Form.Control type="text" placeholder="CST321" />
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Student capacity: </Form.Label>
                                    <Form.Control type="text" placeholder="1 - 120" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group>
                                    <Form.Label>Units: </Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>0</option>
                                        <option value="3.0">3.0</option>
                                        <option value="4.0">4.0</option>
                                        <option value="5.0">5.0</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Meets how many times a week: </Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                                <br/>
                                <Col>
                                <Form.Group> <br/>
                                    <Form.Label>Semester offered in: </Form.Label>                                    
                                    <Form>
                                        <div id="semester" className="mb-3">
                                        <Form.Check  label="FALL ONLY" name="group1" type={'radio'} id={`inline-radio-1`}/>
                                        <Form.Check  label="SPRING ONLY" name="group1" type={'radio'} id={`inline-radio-2`}/>
                                        <Form.Check  label="FALL AND SPRING" name="group1" type={'radio'} id={`inline-radio-2`}/>
                                        </div>
                                    </Form>
                                </Form.Group>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                <Form.Group> <br/>
                                    <Form.Label>Required Classroom: </Form.Label>
                                    <Form.Control type="text" placeholder="BIT321" />
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Required Instructor: </Form.Label>
                                    <Form.Control type="text" placeholder="Dr. Doe" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group> <br/>
                                    <Form.Label>Preferred Classroom: </Form.Label>
                                    <Form.Control type="text" placeholder="BIT321" />
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Preferred Instructor: </Form.Label>
                                    <Form.Control type="text" placeholder="Dr. Doe" />
                                </Form.Group>  
                                </Col>                            
                            </Row>
                            </Form>
                        </Card.Body> <br/>
                        <Button varient="primary" type="submit" style={{backgroundColor:"#112E51"}}> Add New Course </Button>
                    </Card>
                </CardGroup>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsAddCourse;