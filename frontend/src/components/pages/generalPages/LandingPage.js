/* This page will display the landing page, from 
which users can read the website description and login */

import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingStyle from "../../../styles/LandingPage.module.css";
import "../../../styles/Header.css";
import { getLoginConfig, getSignUpConfig } from "../../../network/RequestTemplates";
import axios from "axios";
import LoadingButton from "../../PgComponents/LoadingButton";
import jwt_decode from "jwt-decode"
const LandingPage = (props) => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [showLogInError, setShowLoginErrorState] = useState(false);
    const [userObj, setUserObj] = useState({});
    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
    }, [])


    const google = window.google = window.google ? window.google : {}


    function handleCallbackResponse(response) {
        //console.log("Encoded JWT ID token: " + response.credential);
        //userObj = jwt_decode(response.credential);
        //console.log(userObj);
        setUserObj(jwt_decode(response.credential));
        //console.log(userObj);
        // googleEmail = userObj.email
        //console.log("GOOGLE EMAIL: ", userObj.email);


    }

    useEffect(() => {
        GoogleLogin()
    }, [userObj]);


    // THIS WAY WORKS ONLY IF USER ALREADY EXISTS WITHIN DATABASE
    const GoogleLogin = async () => {
        setShowLoginErrorState(false);
        await axios(getLoginConfig({ email: userObj.email, password: userObj.given_name })).then(
            res => {

                if (res.data.status === "SUCCESS") {
                    console.log(userObj.email, "has logged in successfully")
                    props.updateLoggedInUserData({
                        userData: res.data.usrOb, token: res.data.Login_token,
                        userId: res.data.LoginId
                    })
                }
            }
        ).catch(
            err => {
                alert(err)
                console.log(err)
            }
        )
    }


    useEffect(() => {
        // global google
        // ADD NEW CLIENT ID HERE
        google.accounts.id.initialize({
            client_id: "???",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );


        // google.accounts.id.prompt()

    }, []);



    const ValidateLoginInfo = () => {
        setShowLoginErrorState(false);
        axios(getLoginConfig({ email: Email, password: Password })).then(
            res => {

                if (res.data.status === "SUCCESS") {
                    props.updateLoggedInUserData({
                        userData: res.data.usrOb, token: res.data.Login_token,
                        userId: res.data.LoginId
                    })

                }
                else {
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



    // const GoogleLogin = () => {
    //     console.log("This method got called");

    //     axios(getSignUpConfig({
    //         username: userObj.given_name, password: userObj.given_name, email: userObj.email, first_name: userObj.given_name, last_name: userObj.family_name, is_staff: true, is_active: true
    //     })).then(
    //         signUpRes => {
    //             console.log("SIGN UP SUCCESS", signUpRes.data);
    //             alert("GOOGLE SIGN IN");

    //             // Only perform login if sign-up is successful
    //             axios(getLoginConfig({
    //                 email: userObj.email,
    //                 password: userObj.given_name
    //             })).then(
    //                 loginRes => {
    //                     if (loginRes.data.status === "SUCCESS") {
    //                         props.updateLoggedInUserData({
    //                             userData: loginRes.data.usrOb,
    //                             token: loginRes.data.Login_token,
    //                             userId: loginRes.data.LoginId
    //                         });
    //                     } else {
    //                         setShowLoginErrorState(true);
    //                     }
    //                 }
    //             ).catch(
    //                 loginErr => {
    //                     alert(loginErr);
    //                     console.log(loginErr);
    //                 }
    //             );
    //         }
    //     ).catch(
    //         signUpErr => {
    //             alert(signUpErr);
    //             console.log(signUpErr);
    //         }
    //     );


    // ---------------------------------



    // axios(getSignUpConfig({
    //     username: userObj.given_name, password: userObj.given_name, email: userObj.email, first_name: userObj.given_name, last_name: userObj.family_name, is_staff: true, is_active: true
    // })).then(
    //     signUpRes => {
    //         console.log("SIGN UP SUCCESS", signUpRes.data);
    //         alert("GOOGLE SIGN IN");

    //         // Only perform login if sign-up is successful
    //         axios(getLoginConfig({
    //             email: userObj.email,
    //             password: userObj.given_name
    //         })).then(
    //             loginRes => {
    //                 if (loginRes.data.status === "SUCCESS") {
    //                     props.updateLoggedInUserData({
    //                         userData: loginRes.data.usrOb,
    //                         token: loginRes.data.Login_token,
    //                         userId: loginRes.data.LoginId
    //                     });
    //                 } else {
    //                     setShowLoginErrorState(true);
    //                 }
    //             }
    //         ).catch(
    //             loginErr => {
    //                 alert(loginErr);
    //                 console.log(loginErr);
    //             }
    //         );
    //     }
    // ).catch(
    //     signUpErr => {
    //         alert(signUpErr);
    //         console.log(signUpErr);
    //     }
    // );


    //};


    const displayError = () => {
        //displays invalid Username or password

        if (showLogInError) {
            return <span style={{ color: "red" }}>Invalid username or password</span>;
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
                            <div style={{ position: 'relative' }} className={LandingStyle.SignIn}>
                                <h3>Sign In</h3> <hr />
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" onChange={(e) => {
                                            setEmail(e.target.value);
                                            setShowLoginErrorState(false)
                                        }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" onChange={(e) => {
                                            setPassword(e.target.value);
                                            setShowLoginErrorState(false)
                                        }} />
                                    </Form.Group>
                                </Form>
                                <div style={{ marginBottom: '9px' }}>
                                    <LoadingButton btnName="Login" stopLoadingAnimation={showLogInError}
                                        onclick={() => ValidateLoginInfo()}
                                    ></LoadingButton>
                                </div>

                                <div>
                                    or
                                </div>
                                <br></br>
                                {/* Google Sign In Code Here */}
                                <div>
                                    <div id="signInDiv"></div>
                                </div>

                                <div style={{ position: "absolute", width: '100%', right: "1%" }}>
                                    {displayError()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LandingPage