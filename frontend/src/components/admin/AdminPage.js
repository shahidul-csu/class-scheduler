/* This page will be the first page to greet admin or faculty logging and functions as a gate to prevent users to enter other pages without signing in.*/

import React, {useEffect} from "react";
import "../../styles/settings/SettingsAddCourse.css";
import Button from 'react-bootstrap/Button';
import {FormGroup, FieldGroup, CardGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import LandingHeader from "../LandingHeader";
import LandingPage from "../../styles/LandingPage.module.css";
import MenuButton from "../../styles/MenuButton.module.css";
import {LoggedInUserContext} from "../../../App.js"

import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminPage = (props) => {

    // {showDropDown: false} for each drop down button
    let [buttonDropDownStatusList, setButtonDropDownList] = useState([
        {showDropDown: false}, {showDropDown: false} // there are two drop down buttons
    ]);

    //holds the index of the buttonDropDownStatusList with showDropDown state of true
    let [currentlyOpenedDropDownIndex, setCurrentlyOpenDropDownIndex] = useState(null);

    let navigate = useNavigate();
    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext

    const handleBtnClick =(btnIndex) =>{ //for drop down Bottons only
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
    useEffect(() => {
        document.title = "Class Scheduler"
      }, [])

    return (
        <React.Fragment>
        <LandingHeader index = {[1,2,3]}/>

        <div className="inline-div">
        <h2>Menu</h2>
        <h2>Welcome Admin!</h2>
        </div>
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

                     btnName="Avaliability" btn_Pic_Src={avalaibilityIcon}
                     onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>


                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  

                    btnName="Preferences" btn_Pic_Src={preferenceIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  

                    btnName="Schedule" btn_Pic_Src={scheduleIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>

                    <div className={LandingPage.ButtonShell} >
                    <MenuButton  

                    btnName="Profile" btn_Pic_Src={profileIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div> 
                </div>
            </div>

        {/* <div className="SettingsInfo">
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
            <div className="Right align-self-center">
                        <h1>Welcome back Administrator!</h1>
                        <p> This page is still in maintenance.</p>
            </div>
        </div> 
            </div>
            
    </div> */}

    </React.Fragment>      
    )
}
export default AdminPage