/* This page will display the landing page, from which users can read the website description and login */

import React, {useEffect} from "react";
import LandingHeader from "./LandingHeader";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import Header from "./Header";
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
        <React.Fragment>
        <LandingHeader index = {[]}/>
                            
        </React.Fragment>
    )
}
export default LandingPage