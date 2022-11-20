import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFuncPg from "../../styles/AddFuncPg.module.css";
import TableStyle from "../../styles/TableStyle.module.css";
import bookIcon from "../../images/pencil.png"


const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >
        <div id={TableStyle.tables}>

                <span>Manage users here by editing or deleting their information.</span>

                <table id={TableStyle.tables}>
                    <thead bgcolor="28336e">
                        <tr> 
                            <th width="100">First Name</th>
                            <th width="100">Last Name</th>
                            <th width="100">Email</th>
                            <th width="100">Edit</th>
                            <th width="100">Delete</th>
                        </tr>
                        </thead>
                    <tbody id={TableStyle.cells}>
                    
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td>btn_Pic_Src={pencilIcon}</td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td btn_Pic_Src={pencilIcon}>X</td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td btn_Pic_Src={pencilIcon}>X</td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td btn_Pic_Src={pencilIcon}>X</td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td btn_Pic_Src={pencilIcon}>X</td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td>PencilIcon</td>
                            <td btn_Pic_Src={pencilIcon}>X</td>
                        </tr>
                        {/* <span>Page 1 2 3 ... End ArrowHere</span> */}
                    </tbody>
                </table>

        
        </div>
        </React.Fragment>);
}
export default AddClass