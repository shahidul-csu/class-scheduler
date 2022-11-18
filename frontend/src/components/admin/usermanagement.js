import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingHeader from "../LandingHeader";
import AddFuncPg from "../../styles/AddFuncPg.module.css";
import TableStyle from "../../styles/TableStyle.module.css";



const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >         <LandingHeader index = {[1,2,3]}/>
        {/* <div>

                <span>Manage users here by editing or deleting their information.</span>

                <table bgcolor="lightgray" width="700">

                    <thead bgcolor="marina" width="700">Add User</thead>
                    <tr bgcolor="white"> 
                        <th width="100">First Name</th>
                        <th width="100">Last Name</th>
                        <th width="100">Email</th>
                        <th width="100">Edit</th>
                        <th width="100">Delete</th>
                    </tr>

                    
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>
                    <tr bgcolor="white"> 
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@email</td>
                        <td>PencilIcon</td>
                        <td>X</td>
                    </tr>

                    <span>Page 1 2 3 ... End ArrowHere</span>

                </table>

        
        </div> */}
        </React.Fragment>);
}
export default AddClass