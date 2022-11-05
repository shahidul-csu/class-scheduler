import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/LandingPage.module.css";
import "../styles/Header.css";

const GenSchedule = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <div className="Container">
            <div className="Row">
                <div className="Col1">
                    <div className="LeftCol">
                        <h1>Schedule Page</h1>
                        <p> This page is still in maintenance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome