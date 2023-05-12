import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableStyle from "../../../styles/TableStyle.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getParameterDataModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';


const AllClassrooms = () => {

    const getParameterData = async () => {
        let response = await axios(getGenericAuthModelConfig("GET", {}, {},
            localStorage.getItem('token'), ROUTER.api.classrooms));
        console.log(response.data);
        let rows = document.getElementById(TableStyle.cells);
        console.log(rows);
        rows.innerHTML = "";

        response.data.forEach(classes => {
            let row = document.createElement("tr");
            
            let name = document.createElement("td");
            name.innerHTML = classes.classroom_name;
            row.appendChild(name);

            let capacity = document.createElement("td");
            capacity.innerHTML = classes.capacity;
            row.appendChild(capacity);

            let editCell = document.createElement("td");
            let editButton = document.createElement("button");
            editButton.classList.add("btn");
            editButton.classList.add("btn-primary");
            editButton.innerHTML = "Edit";
            // // editButton.addEventListener("click", productDisplay(this));
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            
            // Buttons go here

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

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
        getParameterData();
      }, [])

    return (<React.Fragment >
        
        {/* function productDelete(ctl) {
    $(ctl).parents("tr").remove();
} */}
        <div id={TableStyle.TableContainer}>

                <span className={TableStyle.HeadInfo}>Manage classrooms here by editing or deleting their information.</span>

                <table id={TableStyle.tables}>
                    <thead >
                    <tr id={TableStyle.sandwichtop}>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}><button type="button" style={{width:"160%",marginLeft:"16px"}} class="btn btn-outline-primary">Add Classroom</button></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        
                        </tr>

                        <tr> 
                            <th width="400">Classroom Name</th>
                            <th width="300">Capacity</th>
                            <th width="100">Edit</th>
                            <th width="100">Delete</th>
                        </tr>
                        </thead>
                    <tbody id={TableStyle.cells}>
                    
                        <tr> 
                            <td>BIT-110</td>
                            <td>35</td>
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
                            <td>BIT-105</td>
                            <td>35</td>
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
                            <td>BIT-104</td>
                            <td>35</td>
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
                            <td>BIT-110</td>
                            <td>35</td>
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
                            <td>BIT-110</td>
                            <td>35</td>
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
                        </tr>
                         {/* <span>Page 1 2 3 ... End ArrowHere</span> */}
                    </tbody>
                    
                </table>
                <div id={TableStyle.sandwichbot}>
                        
                            <div style={{width:"100%"}}>Page 1 2 3 4... End "ArrowHere"</div>

                    </div>

        
        </div>
        </React.Fragment>);
}
export default AllClassrooms