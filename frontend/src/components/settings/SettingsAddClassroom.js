/* This file is going to contain the form for admin to add a classroom */

import React, {useState} from "react";
import "../../styles/settings/SettingsAddClassroom.css";
import { Form, FormGroup, FieldGroup, CardGroup } from "react-bootstrap"; 
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {getClassroomModelConfig, getLoginConfig} from "../../network/RequestTemplates";

const SettingsAddClassroom = () =>  {

    const [classroom, setClassroom] = useState("")
    const [capacity, setCapacity] = useState(0)
    const [token, setToken] = useState()

    const addClassroom = () => {
        axios(getLoginConfig({"username": "alex", "password": "alex"})).then(
            res => {
                setToken(res.data.token)
                alert(res.data.token)
            }
        ).catch(
            err => {
                alert("Incorrect Username or Password")
                console.log(err)
            }
        )

        axios(getClassroomModelConfig( "post", {}, {"capacity": capacity}, token)).then(
            res => {
                console.log("created new classroom", res.data)
                alert("Classroom created")
                // setCapacity(null)
                // setClassroom('')
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }

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
                            {/*<Form onSubmit={foo}>*/}
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Classroom: </Form.Label>
                                            <Form.Control type="text" placeholder="BIT321" onChange={(e) => setClassroom(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group> <br/>
                                            <Form.Label>Room Capacity: </Form.Label>
                                            <Form.Control type="text" placeholder="Example: 80" onChange={(e) => setCapacity(parseInt(e.target.value))}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin", marginTop: "10px"}} onClick={addClassroom}> Add New Classroom </Button>
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

export default SettingsAddClassroom;