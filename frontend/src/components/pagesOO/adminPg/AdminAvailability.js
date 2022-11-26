import React, { Component } from 'react';
import PageCss from '../../../styles/AvaliabilityPg.module.css'


const AdminAvaliabilty= ()=>{
        return (<React.Fragment>
            <div id={PageCss.PageBody}>
            <div id={PageCss.container1}>

                <select id={PageCss.semesterSelect}>
                    <option>Select Semester:</option>
                    <option>Spring 2022</option>
                    <option>Fall 2022</option>
                </select>
                <br></br>

            </div>

            <div id={PageCss.container2}>

                <br></br>

            </div>
            
            

            </div>

            
        </React.Fragment>
        );
}
 
export default AdminAvaliabilty;