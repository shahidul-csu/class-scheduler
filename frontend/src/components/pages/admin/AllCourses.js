import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableStyle from "../../../styles/TableStyle.module.css";
import axios from "axios";
import ROUTER from '../../../network/Router'
import { getSemesterModelConfig, getParameterDataModelConfig, getGenericAuthModelConfig } from '../../../network/RequestTemplates';

const AllCourses = () => {

    const getParameterData = async () => {
        let response = await axios(getGenericAuthModelConfig("GET", {}, {},
            localStorage.getItem('token'), ROUTER.api.courses));
        console.log(response.data);
        let rows = document.getElementById(TableStyle.cells);
        console.log(rows);
        rows.innerHTML = "";

        response.data.forEach(course => {
            let row = document.createElement("tr");
            
            let name = document.createElement("td");
            name.innerHTML = course.name;
            row.appendChild(name);

            let capacity = document.createElement("td");
            capacity.innerHTML = course.capacity;
            row.appendChild(capacity);
            
            let units = document.createElement("td");
            units.innerHTML = course.units;
            row.appendChild(units);
            
            let freq = document.createElement("td");
            freq.innerHTML = course.number_per_week;
            row.appendChild(freq);

            let sync = document.createElement("td");
            sync.innerHTML = course.sync_time;
            row.appendChild(sync);

            let group = document.createElement("td");
            group.innerHTML = course.courseGroup;
            row.appendChild(group);

            rows.appendChild(row);
        });
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

                <span className={TableStyle.HeadInfo}>Manage courses here by editing or deleting their information.</span>

                <table id={TableStyle.tables}>
                    <thead >
                    <tr width="900" id={TableStyle.sandwichtop}>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        <th className={TableStyle.TableNoBorder}><button type="button" style={{width:"190%",marginLeft:"5px"}} class="btn btn-outline-primary">Add User</button></th>
                        <th className={TableStyle.TableNoBorder}></th>
                        </tr>

                        <tr> 
                            <th width="200">Course Name</th>
                            <th width="80">Capacity</th>
                            <th width="50">Units</th>
                            <th width="100">Frequency</th>
                            <th width="100">Sync Time</th>
                            <th width="200">Course Group</th>
                            <th width="100">Edit</th>
                            <th width="100">Delete</th>
                        </tr>
                        </thead>
                    <tbody id={TableStyle.cells}>
                    
                        <tr> 
                            <td>John</td>
                            <td>Doe</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
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
export default AllCourses