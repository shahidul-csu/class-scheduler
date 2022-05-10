/* This file is going to contain the form for admin to add a classroom */

import React from "react";
import "../../styles/settings/SettingsAddClassroom.css";

const SettingsAddClassroom = () =>  {
    return(
        <div className="SettingsAddClassroom">
        <div className="Row">
            <div className="Col1">
                <div className="NavBar">
                    <div className="Login">
                        <a href="/settings">Login Information</a>
                    </div>
                    <div className="UserManagement">
                        <a href="/settingsUser">User Management</a>
                    </div>
                    <div className="AddCourse">
                        <a href="/AddCourse">Add Course</a>
                    </div>
                    <div className="AddClassroom">
                        <a href="/AddClassroom">Add Classroom</a>
                    </div>
                </div>
            </div>
            <div className="Col2">
                <div className="Right">
                   <h1>right of add a classroom</h1>
                </div>
            </div>
        </div>        
        </div>
    )
}

export default SettingsAddClassroom;