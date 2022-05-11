/* This file is going to contain the form for admin to add a classroom */

import React from "react";
import "../../styles/settings/SettingsAddClassroom.css";
import { Form, FormGroup, FieldGroup, CardGroup } from "react-bootstrap"; 
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SettingsAddClassroom = () =>  {
    return(
        <div className="SettingsAddClassroom">
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
                <CardGroup id="cardGroup2">
                    <Card className="AddClassroomForm">
                        <Card.Body>
                            <Form>
                            <Row>
                                <Col>
                                <Form.Group>
                                    <Form.Label>Classroom: </Form.Label>
                                    <Form.Control type="text" placeholder="BIT321" />
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Room Capacity: </Form.Label>
                                    <Form.Control type="text" placeholder="Example: 80" />
                                </Form.Group>
                                {/* <Form.Group> <br/>
                                    <Form.Label>Semester: </Form.Label>
                                    <Form.Control type="text" placeholder="Example: SP22" />
                                </Form.Group> */}
                                </Col>
                                {/* Other input examples */}
                                {/* <Col>
                                <Form.Group> 
                                    <Form.Label>WeekDay: </Form.Label>                                    
                                    <Form>
                                        <div id="weekday" className="mb-3">
                                        <Form.Check  label="Monday" name="group1" type={'checkbox'} id={`inline-checkbox-1`}/>
                                        <Form.Check  label="Tuesday" name="group1" type={'checkbox'} id={`inline-checkbox-2`}/>
                                        <Form.Check  label="Wednesday" name="group1" type={'checkbox'} id={`inline-checkbox-3`}/>
                                        <Form.Check  label="Thursday" name="group1" type={'checkbox'} id={`inline-checkbox-3`}/>
                                        <Form.Check  label="Friday" name="group1" type={'checkbox'} id={`inline-checkbox-3`}/>
                                        </div>
                                    </Form>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group> 
                                    <Form.Label>Daytime: </Form.Label>                                    
                                    <Form>
                                        <div id="daytime" className="mb-3">
                                        <Form.Check  label="8AM-10AM" name="group1" type={'checkbox'} id={`inline-checkbox-1`}/>
                                        <Form.Check  label="10AM-12PM" name="group1" type={'checkbox'} id={`inline-checkbox-2`}/>
                                        <Form.Check  label="12PM-2PM" name="group1" type={'checkbox'} id={`inline-checkbox-3`}/>
                                        <Form.Check  label="2PM-4PM" name="group1" type={'checkbox'} id={`inline-checkbox-4`}/>
                                        <Form.Check  label="4PM-6PM" name="group1" type={'checkbox'} id={`inline-checkbox-5`}/>
                                        <Form.Check  label="6PM-8PM" name="group1" type={'checkbox'} id={`inline-checkbox-6`}/>
                                        </div>
                                    </Form>
                                </Form.Group>
                                </Col> */}
                            </Row>
                            </Form>
                        </Card.Body> <br/>
                        <Button varient="primary" type="submit" style={{backgroundColor:"#112E51"}}> Add New Classroom </Button>
                    </Card>
                </CardGroup>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsAddClassroom;