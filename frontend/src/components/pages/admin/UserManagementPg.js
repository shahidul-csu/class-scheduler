import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableStyle from "../../../styles/TableStyle.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getParameterDataModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';

const UserManagement = () => {

    var [userArray,setUserArray] = useState([]); 

    const getParameterData = async () => {
        let response = await axios(getGenericAuthModelConfig("GET", {}, {},
            localStorage.getItem('token'), ROUTER.api.users));
        console.log(response.data);
        let rows = document.getElementById(TableStyle.cells);
        console.log(rows);
        rows.innerHTML = "";

        response.data.forEach(user => {
            let row = document.createElement("tr");
            
            let firstName = document.createElement("td");
            firstName.innerHTML = user.first_name;
            row.appendChild(firstName);

            let lastName = document.createElement("td");
            lastName.innerHTML = user.last_name;
            row.appendChild(lastName);
            
            let email = document.createElement("td");
            email.innerHTML = user.email;
            row.appendChild(email);

            rows.appendChild(row);
        });


            // .then(
            //     res => {
            //         Data = res.data.data;
            //         setUserArray(Data);
            //     }).catch(
            //         err => {
            //             alert(err)
            //             console.log(err)
            //         });
        //console.log(userArray);
    }

    function updateRows(){

    }

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
        getParameterData() 
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
                    
                        {/* <tr> 
                            <td>getParameterData</td>
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
                        </tr> */}
                         {/* <span>Page 1 2 3 ... End ArrowHere</span> */}
                    </tbody>

                    
                </table>
                <div id={TableStyle.sandwichbot}>
                        
                            <div style={{width:"100%"}}>Page 1 2 3 4... End "ArrowHere"</div>

                    </div>

        
        </div> 
        </React.Fragment>);
}
export default UserManagement