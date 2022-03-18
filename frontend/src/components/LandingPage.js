/* This page will display the landing page, from which users can read the website description and login */

import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/LandingPage.css";
import "../styles/Header.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

const LandingPage = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <div className="Container">
            <div className="Row">
                <div className="Col1">
                    <div className="LeftCol">
                        <h1>Finding the optimal class shedule</h1>
                        <p> Class Scheduler is designed to take a list of resources and constraints and recommend a class
                            schedule that meets all of the strict requirements while maximizing the preference requirements.
                        </p>
                    </div>
                </div>
                <div className="Col2">
                    <div className="RightCol">
                        <div className="SignIn">
                            <h3>Sign In</h3> <hr/> 
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"/> 
                                </Form.Group>
                                <Button varient="primary" type="submit" style={{backgroundColor:"#112E51"}}>
                                    Login
                                </Button>
                            </Form>
                        </div>
                        {/* <div className="SignUp">
                            <h3>Sign Up</h3> <hr/>
                            <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="primary" placeholder="First Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lname" placeholder="Last Name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Username" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group> 
                            <br/>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Re-Enter Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <br/>
                            <Button variant="primary" type="submit" style={{backgroundColor:"#112E51"}}>
                                Sign Up 
                            </Button>
                            </Form>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage