import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <div className="Container">
            <div className="Row">
                <div className="Col1">
                    <div className="LeftCol">
                        <h1>Add New Classroom</h1>
                        <p> Please a classroom below with the classroom name and the capacity of the classroom.
                        </p>
                    </div>
                </div>
                <div className="Left">
                    <p>
                        Class Name
                    </p>
                    <Form.Group className="mb-3" controlId="AddClass">
                                    <Form.Label>Class Name</Form.Label>
                                    <Form.Control type="classname" placeholder="BIT 100" required/>
                    </Form.Group>
                </div>
                <div className="Right">
                    <p>
                        Capacity
                    </p>
                    <Form.Group className="mb-3" controlId="Capacity">
                                    <Form.Label>Class Name</Form.Label>
                                    <Form.Control type="capacity" placeholder="50" required/>
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}
export default AddClass