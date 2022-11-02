/* This page will be the first page to greet admin or faculty logging and functions as a gate to prevent users to enter other pages without signing in.*/

import React, {useEffect} from "react";
import "../../styles/settings/SettingsAddCourse.css";
import Button from 'react-bootstrap/Button';
import {FormGroup, FieldGroup, CardGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import LandingHeader from "../LandingHeader";

import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminPage = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <React.Fragment>
        <LandingHeader index = {[1,2,3]}/>
        <div className="SettingsInfo">
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
            <div className="Right align-self-center">
                        <h1>Welcome back Administrator!</h1>
                        <p> This page is still in maintenance.</p>
            </div>
        </div> 
            </div>
            
    </div>
    </React.Fragment>      
    )
}
export default AdminPage