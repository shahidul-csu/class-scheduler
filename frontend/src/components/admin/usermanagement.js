import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "../../styles/LandingPage.module.css";
import AddFuncPg from "../../styles/AddFuncPg.module.css";
import TableStyle from "../../styles/TableStyle.module.css";
import MenuButton from '../MenuButton';
import pencilIcon from "../../images/pencil.png"


const AddClass = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (<React.Fragment >
        
        {/* function productDelete(ctl) {
    $(ctl).parents("tr").remove();
} */}
        <div id={TableStyle.TableContainer}>


                <span className={TableStyle.HeadInfo}>Manage users here by editing or deleting their information.</span>

                <table id={TableStyle.tables}>
                    <thead>
                        <tr id={TableStyle.sandwichtop}>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}><button type="button" style={{width:"190%",marginLeft:"5px"}} class="btn btn-outline-primary">Add User</button></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        </tr>

                        <tr> 
                            <th width="300">First Name</th>
                            <th width="300">Last Name</th>
                            <th width="300">Email</th>
                            <th width="100">Edit</th>
                            <th width="100">Delete</th>
                        </tr>
                        </thead>
                    <tbody id={TableStyle.cells}>
                    
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td> 
                                <button type='button'
                                onclick='productDisplay(this);' 
                                class='btn btn-primary'>
                                     Edit 
                                    </button>     
                            </td>
                            <td>
                                <button type='button' 
                                onclick='productDelete(this);' 
                                class='btn btn-danger'>
                                     X 
                                    </button>
                            </td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td> 
                                <button type='button'
                                onclick='productDisplay(this);' 
                                class='btn btn-primary'>
                                     Edit 
                                    </button>     
                            </td>
                            <td>
                                <button type='button' 
                                onclick='productDelete(this);' 
                                class='btn btn-danger'>
                                     X 
                                    </button>
                            </td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td> 
                                <button type='button'
                                onclick='productDisplay(this);' 
                                class='btn btn-primary'>
                                     Edit 
                                    </button>     
                            </td>
                            <td>
                                <button type='button' 
                                onclick='productDelete(this);' 
                                class='btn btn-danger'>
                                     X 
                                    </button>
                            </td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td> 
                                <button type='button'
                                onclick='productDisplay(this);' 
                                class='btn btn-primary'>
                                     Edit 
                                    </button>     
                            </td>
                            <td>
                                <button type='button' 
                                onclick='productDelete(this);' 
                                class='btn btn-danger'>
                                     X 
                                    </button>
                            </td>
                        </tr>
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@email</td>
                            <td> 
                                <button type='button'
                                onclick='productDisplay(this);' 
                                class='btn btn-primary'>
                                     Edit 
                                    </button>     
                            </td>
                            <td>
                                <button type='button' 
                                onclick='productDelete(this);' 
                                class='btn btn-danger'>
                                     X 
                                    </button>
                            </td>
                        </tr>
                        <tr> 
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>
                            <td>_ </td>                         
                        </tr>
                         {/* <span>Page 1 2 3 ... End ArrowHere</span> */}
                    </tbody>

                    
                </table>
                <div id={TableStyle.sandwichbot}>
                        
                            <div style={{width:"100%"}}>Page 1 2 3 4... End "ArrowHere"</div>

                    </div>

        
        </div> */}
        </React.Fragment>);
}
export default AddClass