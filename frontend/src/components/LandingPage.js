/* This page will display the landing page, from which users can read the website description and login */

import React, {useEffect} from "react";
import LandingHeader from "./LandingHeader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingStyle from "../styles/LandingPage.module.css";
import "../styles/Header.css";

const LandingPage = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <div className={LandingStyle.Container}>
            <div className={LandingStyle.Row}>
                <div className={LandingStyle.Col1}>
                    <div className={LandingStyle.LeftCol}>
                        <h1>Finding the optimal class schedule</h1>
                        <p> Class Scheduler is designed to take a list of resources and constraints and recommend a class
                            schedule that meets all of the strict requirements while maximizing the preference requirements.
                        </p>
                    </div>
                </div>
                <div className={LandingStyle.Col2}>
                    <div className={LandingStyle.RightCol}>
                        <div className={LandingStyle.SignIn}>
                            <h3>Sign In</h3> <hr/> 
                            <Form action = "/welcome">
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="user@email.com" required/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="password" required/> 
                                </Form.Group>
                                <Form.Group  className="mb-3" controlId="formGroupSubmit">
                                    <Form.Label>Submit</Form.Label>
                                    <Form.Control type="submit" value="Login"></Form.Control>
                                </Form.Group>
                                {/* <Button varient="primary" type="submit" style={{backgroundColor:"#112E51"}} onClick={routeChange}>
                                    Login
                                </Button> */}
                                <Link to="/display">submit</Link>
                                <Link to="/welcome">Welcome Page</Link>
                                <Link to="/adminpage">Admin Page</Link>
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