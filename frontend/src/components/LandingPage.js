/* This page will display the landing page, from which users can read the website description and login */
import React, {useState, useEffect, useContext} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/LandingPage.css";
import "../styles/Header.css";
import { getLoginConfig } from "../network/RequestTemplates";
import axios from "axios";
import {LoggedInUserContext} from '../App'
import LoadingButton from "./LoadingButton";
import loadingImg from "../images/loading.png"
const LandingPage = (props) => {
    let userContext = useContext(LoggedInUserContext); // gets the loggend in User
    let navigate = useNavigate();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])


      useEffect(() => {
        if( userContext){
            handelNavigation();
        }
      }, [userContext]) //Means this is called only when that userContext changes

const handelNavigation = () => {
    if( userContext.is_superuser){
        navigate('/settings')
    }
        else{
            navigate('/FacultyLandingPg')
        }
} 


    const ValidateLoginInfo = () => {
       let data = axios(getLoginConfig({email:Email, password: Password})).then(
            res => {

                if(res.data.status == "SUCCESS")
                {
                props.updateLoggedInUserData({userData: res.data.usrOb, token: res.data.Login_token}) 

                }
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        }

    return (
        <div className="Container">
            <div className="Row">
                <div className="Col1">
                    <div className="LeftCol">
                        <h1>Finding the optimal class schedule</h1>
                        <p> Class Scheduler is designed to take a list of resources and constraints and recommend a class
                            schedule that meets all of the strict requirements while maximizing the preference requirements.
                        </p>
                    </div>
                </div>
                <div className="Col2">
                    <div className="RightCol">
                        <div className="SignIn">
                            <h3>Sign In</h3> <hr/> 
                            <Form >
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} /> 

                                </Form.Group>
                                {/* <Button varient="primary" type="submit" style={{backgroundColor:"#112E51"}} onClick={routeChange}>
                                    Login
                                </Button> */}

                                <Link to="/display">submit</Link>
                                <Link to="/welcome">Welcome Page</Link>
                                <Link to="/adminpage">Admin Page</Link>

                            </Form>
                            <LoadingButton btnName="Login" onclick={()=>  ValidateLoginInfo()}
                             ></LoadingButton>
                            {/* <Button variant="primary" style={{backgroundColor:"#112E51"}} onClick={async()=> await ValidateLoginInfo()}>
                            Login {<img style={{height: "10px", width:"10px"}} src={loadingImg} alt="Loading ..." />}
                                </Button> */}
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