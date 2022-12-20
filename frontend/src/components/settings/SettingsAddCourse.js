/* This file is going to contain the form for admin to add a course */

import React, {  useState } from "react";
import "../../styles/settings/SettingsAddCourse.css";
import { Form, CardGroup } from "react-bootstrap"; 
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { getCourseModelConfig } from "../../network/RequestTemplates";


// const AddCourse = ({ onAdd }) => {
//     const [course_id, setCourseId] = useState("");
//     const [name, setName] = useState("");
//     const [units, setUnits] = useState(null);
//     const [number_per_week, setNumberPerWeek] = useState(null);
//     const [sync_time, setSyncTime] = useState(null);
//     const [capacity, setCapacity] = useState(null);
//     const [course, setCourse] = useState([]);
// }

// useEffect(() => {
//     refreshCourse();
// }, []);

// const refreshCourse = () => {
    
// }
// "course_id": course_id, "name": name, "units": units, "number_per_week": number_per_week, "sync_time": sync_time, "capacity": capacity, "course": course
const SettingsAddCourse = () =>  {
    const [course_id, setCourseId] = useState("");
    const [name, setName] = useState("");
    const [units, setUnits] = useState();
    const [number_per_week, setNumberPerWeek] = useState();
    const [sync_time, setSyncTime] = useState();
    const [capacity, setCapacity] = useState();
    const [course, setCourse] = useState([]);
    
    const addCourse = () => {
        axios(getCourseModelConfig( "POST", "", {name: name, capacity: +capacity, units: +units, number_per_week: +number_per_week}, "f13bc6cc988aabad505a8f603b73a7163c6be0da")).then(
            res => {
                console.log("created new course", res.data)
                alert("Course created")
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
                console.log(name)
            }
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
                {/* "course_id": course_id, "name": name*, "units": units*, "number_per_week": number_per_week*, "sync_time": sync_time, "capacity": capacity*, "course": course             */}
                <CardGroup id="cardGroup">
                    <Card className="AddCourseForm">
                        <Card.Body>
                        <Form onSubmit={addCourse}>
                            <Row>
                                <Col>
                                <Form.Group>
                                    <Form.Label>Course Title: </Form.Label>
                                    <Form.Control type="text" placeholder="ex. CST321" onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Student capacity: </Form.Label>
                                    <Form.Control type="text" placeholder="1 - 120" onChange={(e) => setCapacity(e.target.value)}/>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group>
                                    <Form.Label>Units: </Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setUnits(e.target.value)}>
                                        <option>0</option>
                                        <option value="3.0">3.0</option>
                                        <option value="4.0">4.0</option>
                                        <option value="5.0">5.0</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group> <br/>
                                    <Form.Label>Meets how many times a week: </Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setNumberPerWeek(e.target.value)}>
                                        <option>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                                <br/>
                                {/* Other input examples */}
                                {/* <Col>
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
                                </Col> */}
                                </Row>
                                <Row>

                                {/* The user is able to input Preferred and Required conditions */}
                                
                                {/* <Col>
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
                                </Col>                             */}
                            </Row>
                            {/* <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin"}}> Add New Course </Button> */}
                            </Form>
                        </Card.Body> <br/>
                        <Button varient="primary" type="submit" style={{backgroundColor:"#112E51", border: "#112E51 solid thin"}} onClick={addCourse}> Add New Course </Button>
                    </Card>
                </CardGroup>
                
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsAddCourse;