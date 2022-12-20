/* This page will display the landing page, from 
which users can read the website description and login */

import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingStyle from "../../../styles/LandingPage.module.css";
import "../../../styles/Header.css";
import { getLoginConfig } from "../../../network/RequestTemplates";
import axios from "axios";
import LoadingButton from "../../PgComponents/LoadingButton";
const LandingPage = (props) => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [showLogInError, setShowLoginErrorState] = useState(false);
    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])



    const ValidateLoginInfo = () => {
        setShowLoginErrorState(false);
    axios(getLoginConfig({email:Email, password: Password})).then(
            res => {

                if(res.data.status === "SUCCESS")
                {
                props.updateLoggedInUserData({userData: res.data.usrOb, token: res.data.Login_token,
                     userId:res.data.LoginId}) 

                }
                else{
                    setShowLoginErrorState(true);
                }
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
        }

    const displayError = ()=>{
        //displays invalid Username or password

        if(showLogInError){
            return <span style={{color:"red"}}>Invalid username or password</span>;
        }

    }

    return (
        <React.Fragment>

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
                        <div style={{position:'relative'}} className={LandingStyle.SignIn}>
                            <h3>Sign In</h3> <hr/> 
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" onChange={(e) => {setEmail(e.target.value); 
                                    setShowLoginErrorState(false)}} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => {setPassword(e.target.value);
                                    setShowLoginErrorState(false)}} /> 
                                </Form.Group>
                            </Form>
                            <div style={{marginBottom:'9px'}}>
                            <LoadingButton  btnName="Login" stopLoadingAnimation={showLogInError} 
                            onclick={()=>  ValidateLoginInfo()}
                             ></LoadingButton>
                             </div>
                             <div style={{position:"absolute",width:'100%', right:"1%"}}>
                             {displayError()}
                             </div>
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
        </React.Fragment>
    )
}
export default LandingPage