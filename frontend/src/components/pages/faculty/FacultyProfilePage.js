/* This page will display the landing page, from 
which users can read the website description and login */

import React, { useContext, useState, useEffect } from 'react';
import { LoggedInUserContext } from "../../../App.js" //import the use context variable
import profileIcon from "../../../images/Profile Menu Icon.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminProfilePageCSS from "../../../styles/LandingPage.module.css";
import "../../../styles/Header.css";

const FacultyProfilePage = () => {

    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
    }, [])



    return (
        <React.Fragment>


            <div className={AdminProfilePageCSS.Container}>
                <div className={AdminProfilePageCSS.Row}>
                    <div className={AdminProfilePageCSS.Col1}>
                        <div className={AdminProfilePageCSS.RightCol}>
                            <h1><strong>Profile Picture</strong></h1>
                            <img src={profileIcon} alt="Profile Icon" id={AdminProfilePageCSS.profileIcon}
                            />

                        </div>
                    </div>
                    <div className={AdminProfilePageCSS.Col2}>
                        <div className={AdminProfilePageCSS.RightCol}>
                            <div style={{ position: 'absolute' }}>

                                <br></br>
                                <br></br>
                                <h3>Name: <strong>{userData.first_name} {userData.last_name}</strong></h3>

                                <br></br>
                                <h3>Email: <strong>{userData.email}</strong></h3>

                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default FacultyProfilePage;