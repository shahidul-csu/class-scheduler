import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingHeader from "../LandingHeader";
import AddFuncPg from "../../styles/AddFuncPg.module.css";



const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >         <LandingHeader index = {[1,2,3]}/>
        <div id={AddFuncPg.pageBody}>

                <p id={AddFuncPg.pgInstructions} ><b>Manage users here by editing or deleting their information.</b></p>

                <Table>
                    <tr> First name </tr>
                </Table>

        
        </div>
        </React.Fragment>);
}
export default AddClass