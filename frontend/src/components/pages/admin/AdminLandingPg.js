import React, { useContext, useState } from 'react';
import "../../../styles/settings/SettingsAddCourse.css";

import LandingPage from "../../../styles/LandingPage.module.css";
import { LoggedInUserContext } from "../../../App.js"

import { useNavigate } from "react-router-dom";
import MenuButtonMemo from '../../PgComponents/MenuButton';
import DropDownMenuButton from '../../PgComponents/DropDownMenuButton';

import preferenceIcon from "../../../images/Preference Menu Icon.png"
import scheduleIcon from "../../../images/Schedule Menu Icon.png"
import profileIcon from "../../../images/Profile Menu Icon.png"
import logOutIcon from "../../../images/logout Menu Icon.png"

import bookIcon from "../../../images/BooksIcon.png"
import userManagement from "../../../images/UserManagement.png"
import classIcon from "../../../images/ClassIcon.png"
import instructorIcon from "../../../images/InstructorCourseIcon.png"
import courseAssignIcon from "../../../images/AssignCoursesIcon.png"


const AdminPage = (props) => {

    // adds the status for each dropDown
    const addDroupDownStatusList = (numOfDropDowns) => {
        let newButtonDropDownStatusList = [];

        for (let x = numOfDropDowns; x > 0; x--) {
            newButtonDropDownStatusList = [...newButtonDropDownStatusList,
            { showDropDown: false }];
        }

        return newButtonDropDownStatusList;
    }

    // {showDropDown: false} for each drop down button
    let [buttonDropDownStatusList, setButtonDropDownList] = useState(
        //******************************************/
        // there are three(3) drop down buttons
        addDroupDownStatusList(4)

        //NOTE: When adding new drop down buttons
        // in the future increment the param passed
        // into addDroupDownStatusList function.
        //*****************************************/

    );

    //holds the index of the buttonDropDownStatusList 
    //with showDropDown state of true
    let [currentlyOpenedDropDownIndex, setCurrentlyOpenDropDownIndex] = useState(null);

    let navigate = useNavigate();
    let userData = useContext(LoggedInUserContext);



    //for drop down Bottons only
    const handelDropDownBtnClick = (btnIndex) => {
        const newButtonDropDownStatusList = [...buttonDropDownStatusList];

        // holds the buttonDropDownStatusList 
        //index thats going to have a state 
        //of {showDropDown: true} next
        let newOpenedButtonIndex = null;


        if (currentlyOpenedDropDownIndex !== null) { // if a dropdown is open

            if (currentlyOpenedDropDownIndex !== btnIndex) {
                //if you clicked on another button with a 
                //dropDown functionality but there is 
                //another dropDown already open from 
                //a different button

                newOpenedButtonIndex = btnIndex;
                newButtonDropDownStatusList[newOpenedButtonIndex] = { showDropDown: true };
                //open the dropDown of the newlyClickedButton
            }

            // close the opened dropDown previously clicked Button
            newButtonDropDownStatusList[currentlyOpenedDropDownIndex] = { showDropDown: false };
        }
        else { // if no dropDown is open
            newOpenedButtonIndex = btnIndex;
            newButtonDropDownStatusList[newOpenedButtonIndex] = { showDropDown: true };
        }

        setCurrentlyOpenDropDownIndex(newOpenedButtonIndex);
        setButtonDropDownList(newButtonDropDownStatusList);
    }


    const closeCurentlyOpenedDroupDown = () => {
        if (currentlyOpenedDropDownIndex !== null) {
            const newButtonDropDownStatusList = [...buttonDropDownStatusList];

            newButtonDropDownStatusList[currentlyOpenedDropDownIndex] = { showDropDown: false };
            setCurrentlyOpenDropDownIndex(null);
            setButtonDropDownList(newButtonDropDownStatusList);
        }
    }



    return (
        <React.Fragment>

            <div id={LandingPage.myPageBody} onClick={() => closeCurentlyOpenedDroupDown()}>
                <div id={LandingPage.myHeader}>

                    <span id={LandingPage.header1}
                        className={`${LandingPage.disableSelect}`} >Menu</span>

                    <span id={LandingPage.header2}
                        className={`${LandingPage.disableSelect}`}>Welcome {userData.first_name}</span>
                </div>



                <div id={LandingPage.menuBtnGroup}>
                    {/* ************************************ MENU BUTTONS HERE ***************************************** */}
                    <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo

                            btnName="Approval" btn_Pic_Src={preferenceIcon}
                            onclick={() => navigate("/ApproveDeny")}>

                        </MenuButtonMemo>
                    </div>
                    <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo
                            btnName="Assign Time" btn_Pic_Src={instructorIcon}
                            onclick={() => navigate("/AssignTime")}>
                        </MenuButtonMemo>
                    </div>


                    <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="All Courses" btn_Pic_Src={bookIcon}
                            showDropDown={buttonDropDownStatusList[0].showDropDown}
                            BtnClickHandler={() => handelDropDownBtnClick(0)} imgWidth={70}
                            imgHeight={64}>

                            {/* Drop down options */}

                            {/*{[option name , routeLink   ]}*/}
                            {["Add Course", "/AddCourse2"]}
                            {["View Courses", "/allcourses"]}

                        </DropDownMenuButton>

                    </div>

                    <div className={LandingPage.ButtonShell} >
                        <DropDownMenuButton btnName="Assign Courses" btn_Pic_Src={courseAssignIcon}
                            showDropDown={buttonDropDownStatusList[3].showDropDown}
                            BtnClickHandler={() => handelDropDownBtnClick(3)}>

                            {/* Drop down options Below */}

                            {/*{[option name , routeLink   ]}*/}
                            {["Time", "/CourseTime"]}
                            {["Preference Time", "/PreferenceCourseTime"]}
                            {["Classroom", "/CourseClassroom"]}
                            {["Semester", "/CourseSemester"]}
                            {["Instructor", "/InstructorCourse"]}

                            {/* Drop down options */}



                        </DropDownMenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="All Classrooms" btn_Pic_Src={classIcon}
                            showDropDown={buttonDropDownStatusList[1].showDropDown}
                            BtnClickHandler={() => handelDropDownBtnClick(1)}>

                            {/* Drop down options Below */}

                            {/*{[option name , routeLink   ]}*/}
                            {["Add Classroom", "/AddClass"]}
                            {["View Classes", "/allclassrooms"]}
                        </DropDownMenuButton>

                    </div>

                    <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="Manage Users" btn_Pic_Src={userManagement}
                            showDropDown={buttonDropDownStatusList[2].showDropDown}
                            BtnClickHandler={() => handelDropDownBtnClick(2)} >

                            {/* Drop down options below*/}

                            {/*{[option name , routeLink   ]}*/}
                            {["Add User", "/addUser"]}
                            {["View Users", "/usermanagement"]}
                        </DropDownMenuButton>

                    </div>



                    {/* <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo

                            btnName="Assign Instructor" btn_Pic_Src={instructorIcon}
                            onclick={() => navigate("/InstructorCourse")}>

                        </MenuButtonMemo>
                    </div> */}

                    <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo

                            btnName="Schedule" btn_Pic_Src={scheduleIcon}
                            onclick={() => navigate("/genschedule")}>

                        </MenuButtonMemo>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo
                            // avaliability_Faculty

                            btnName="Profile" btn_Pic_Src={profileIcon}
                            onclick={() => navigate("/AdminProfilePage")}>

                        </MenuButtonMemo>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                        <MenuButtonMemo

                            btnName="Logout" btn_Pic_Src={logOutIcon}
                            onclick={() => {
                                props.clearLoginData(); navigate("/");
                            }
                            }>

                        </MenuButtonMemo>
                    </div>

                    {/* ************************************ MENU BUTTONS END HERE ***************************** */}


                </div>
            </div>

        </React.Fragment>
    )
}
export default AdminPage