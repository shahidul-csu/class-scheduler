import React, {useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import TableStyle from "../../../styles/TableStyle.module.css";



const AllClassrooms = () => {

    /* Set page tab name */
    useEffect(() => {
        document.title = "Class Scheduler"
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