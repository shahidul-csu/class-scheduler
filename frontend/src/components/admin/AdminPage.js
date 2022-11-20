/* This page will be the first page to greet admin or faculty logging and functions as a gate to prevent users to enter other pages without signing in.*/
import React, {Component, useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../../styles/LandingPage.module.css";
import MenuButton from '../MenuButton';
import DropDownMenuButton from '../DropDownMenuButton';
import avalaibilityIcon from "../../images/Avaliability Menu Icon.png"
import preferenceIcon from "../../images/Preference Menu Icon.png"
import scheduleIcon from "../../images/Schedule Menu Icon.png"
import profileIcon from "../../images/Profile Menu Icon.png"
import logOutIcon from "../../images/logout Menu Icon.png"
import testIcon from "../../images/testIcon.png"
import bookIcon from "../../images/pencil.png"
import {LoggedInUserContext} from "../../App.js"


const AdminPage = (props) => {

    // {showDropDown: false} for each drop down button
    let [buttonDropDownStatusList, setButtonDropDownList] = useState([
        {showDropDown: false}, {showDropDown: false} // there are two drop down buttons
    ]);

    //holds the index of the buttonDropDownStatusList with showDropDown state of true
    let [currentlyOpenedDropDownIndex, setCurrentlyOpenDropDownIndex] = useState(null);

    let navigate = useNavigate();
    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext

    const handelBtnClick =(btnIndex) =>{ //for drop down Bottons only
        const newButtonDropDownStatusList = [...buttonDropDownStatusList];
        let newOpenedButtonIndex = null; 
        // holds the buttonDropDownStatusList index thats 
        //going to have a state of {showDropDown: true} next

        if(currentlyOpenedDropDownIndex !==null){ // if a dropdown is open

            if(currentlyOpenedDropDownIndex !== btnIndex){
                //if you clicked on another button with a dropDown functionality
                // but there is another dropDown already open from a different button

                newOpenedButtonIndex = btnIndex;
                newButtonDropDownStatusList[newOpenedButtonIndex] = {showDropDown: true};
                //open the dropDown of the newlyClickedButton
            }

            newButtonDropDownStatusList[currentlyOpenedDropDownIndex] ={showDropDown: false}; // close the opened dropDown previously clicked Button  
        }
        else{ // if no dropDown is open
            newOpenedButtonIndex = btnIndex;

            newButtonDropDownStatusList[newOpenedButtonIndex]= {showDropDown: true};

        }

        setCurrentlyOpenDropDownIndex(newOpenedButtonIndex);
        setButtonDropDownList(newButtonDropDownStatusList);
    }


    const closeCurentlyOpenedDroupDown = () => {
        if(currentlyOpenedDropDownIndex !==null){
                const newButtonDropDownStatusList = [...buttonDropDownStatusList];

                newButtonDropDownStatusList[currentlyOpenedDropDownIndex] = {showDropDown: false};
                setCurrentlyOpenDropDownIndex(null);
                setButtonDropDownList(newButtonDropDownStatusList);
        }
    }

    /* Set page tab name */
    

    return (
        <React.Fragment>
        {/* useEffect(() => {
        document.title = "Class Scheduler"
      }, [])<div className="inline-div">
        <h2>Menu</h2>
        <h2>Welcome Admin!</h2>
        </div> */}
        <div id={LandingPage.myPageBody} onClick={()=>closeCurentlyOpenedDroupDown()}>
                    <div id={LandingPage.myHeader}>

                <span id={LandingPage.header1} 
                className={`${LandingPage.disableSelect}`} >Menu</span>

                <span id={LandingPage.header2} 
                className={`${LandingPage.disableSelect}`}>Welcome {userData.first_name}</span>
                </div>



                <div id={LandingPage.menuBtnGroup}>
{/* ************************************ MENU BUTTONS HERE ***************************************** */}
                    <div className={LandingPage.ButtonShell} >
                    <MenuButton 

                     btnName="Approval" btn_Pic_Src={preferenceIcon}
                     onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>


                    <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="AllCourses" btn_Pic_Src={bookIcon}
                        showDropDown={buttonDropDownStatusList[0].showDropDown}
                        BtnClickHandler={()=>handelBtnClick(0)}>
                            
                            {/* Drop down options */}
                        {/* {[option name, routeLink]}       */}
                            {["Add Course","/AddCourse"]}
                            {["Add Class","/AddClass"]}

                        </DropDownMenuButton>

                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  

                    btnName="AllClassrooms" btn_Pic_Src={scheduleIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton 

                     btnName="UserManagement" btn_Pic_Src={avalaibilityIcon}
                     onclick={() => navigate("/usermanagement")}>

                    </MenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton 

                     btnName="Schedule" btn_Pic_Src={scheduleIcon}
                     onclick={() => navigate("/genschedule")}>

                    </MenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  

                    btnName="Profile" btn_Pic_Src={profileIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div> 
 {/* ********************2 TESTED BUTTON here ******************************/}

 <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="textDropDown" btn_Pic_Src={testIcon}
                        showDropDown={buttonDropDownStatusList[0].showDropDown}
                        BtnClickHandler={()=>handelBtnClick(0)}>
                            
                            {/* Drop down options */}
                        {/* {[option name, routeLink]}       */}
                            {["hello","/display"]}
                            {["world","/display"]}

                        </DropDownMenuButton>

                    </div>

                    <div className={LandingPage.ButtonShell}>
                        <DropDownMenuButton btnName="textDropDown2" btn_Pic_Src={testIcon}
                        showDropDown={buttonDropDownStatusList[1].showDropDown}
                        BtnClickHandler={()=> handelBtnClick(1)}>

                               {/* Drop down options */}
                        {/* {[option name, routeLink]}       */}
                            {["hello","/display"]}
                            {["world","/display"]}
                        </DropDownMenuButton>

                    </div>

            {/* ********************2 TESTSED BUTTON END HERE******************************/}
        



                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  
                    
                    btnName="Logout" btn_Pic_Src={logOutIcon} 
                    onclick={() =>{props.clearLoginData(); navigate("/");
                        }
                        }>

                    </MenuButton>
                    </div>

{/* ************************************ MENU BUTTONS END HERE ***************************** */} 

                </div>
            </div>

    </React.Fragment>      
    )
}
export default AdminPage