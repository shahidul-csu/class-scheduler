import React, { Component,useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import facultyLandingPgCSS from '../../../styles/facultyLanding.module.css'
import MenuButton from '../../MenuButton';
import DropDownMenuButton from '../../DropDownMenuButton';
import avalaibilityIcon from "../../../images/Avaliability Menu Icon.png"
import preferenceIcon from "../../../images/Preference Menu Icon.png"
import scheduleIcon from "../../../images/Schedule Menu Icon.png"
import profileIcon from "../../../images/Profile Menu Icon.png"
import logOutIcon from "../../../images/logout Menu Icon.png"
import testIcon from "../../../images/testIcon.png"
import {LoggedInUserContext} from "../../../App.js" //import the use context variable



const FacultyLandingPg = (props)=> {

    // {showDropDown: false} for each drop down button
    let [buttonDropDownStatusList, setButtonDropDownList] = useState([
        {showDropDown: false}, {showDropDown: false} // there are two drop down buttons
    ]);

    //holds the index of the buttonDropDownStatusList with showDropDown state of true
    let [currnetlyOpenedDropDownIndex, setCurrentlyOpenDropDownIndex] = useState(null);

    let navigate = useNavigate();
    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext


    const handelBtnClick =(btnIndex) =>{ //for drop down Bottons only
        const newButtonDropDownStatusList = [...buttonDropDownStatusList];
        let newOpenedButtonIndex = null; 
        // holds the buttonDropDownStatusList index thats 
        //going to have a state of {showDropDown: true} next

        if(currnetlyOpenedDropDownIndex !==null){ // if a dropdown is open

            if(currnetlyOpenedDropDownIndex !== btnIndex){
                //if you clicked on another button with a dropDown functionality
                // but there is another dropDown already open from a different button

                newOpenedButtonIndex = btnIndex;
                newButtonDropDownStatusList[newOpenedButtonIndex] = {showDropDown: true};
                //open the dropDown of the newlyClickedButton
            }

            newButtonDropDownStatusList[currnetlyOpenedDropDownIndex] ={showDropDown: false}; // close the opened dropDown previously clicked Button  
        }
        else{ // if no dropDown is open
            newOpenedButtonIndex = btnIndex;

            newButtonDropDownStatusList[newOpenedButtonIndex]= {showDropDown: true};
            
        }

        setCurrentlyOpenDropDownIndex(newOpenedButtonIndex);
        setButtonDropDownList(newButtonDropDownStatusList);
    }


    const closeCurentlyOpenedDroupDown = () => {
        if(currnetlyOpenedDropDownIndex !==null){
                const newButtonDropDownStatusList = [...buttonDropDownStatusList];
    
                newButtonDropDownStatusList[currnetlyOpenedDropDownIndex] = {showDropDown: false};
                setCurrentlyOpenDropDownIndex(null);
                setButtonDropDownList(newButtonDropDownStatusList);
        }
    }

        return (
            <React.Fragment>
                <div id={facultyLandingPgCSS.myPageBody} onClick={()=>closeCurentlyOpenedDroupDown()}>
                    <div id={facultyLandingPgCSS.myHeader}>

                <span id={facultyLandingPgCSS.header1} 
                className={`${facultyLandingPgCSS.disableSelect}`} >Menu</span>

                <span id={facultyLandingPgCSS.header2} 
                className={`${facultyLandingPgCSS.disableSelect}`}>Welcome {userData.first_name}</span>
                </div>

                

                <div id={facultyLandingPgCSS.menuBtnGroup}>
{/* ************************************ MENU BUTTONS HERE ***************************************** */}
                    <div className={facultyLandingPgCSS.ButtonShell} >
                    <MenuButton 

                     btnName="Avaliability" btn_Pic_Src={avalaibilityIcon}
                     onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>
                    
                    
                    <div className={facultyLandingPgCSS.ButtonShell} >
                    <MenuButton  
                    
                    btnName="Preferences" btn_Pic_Src={preferenceIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>

                    <div className={facultyLandingPgCSS.ButtonShell} >
                    <MenuButton  
                    
                    btnName="Schedule" btn_Pic_Src={scheduleIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>

                    <div className={facultyLandingPgCSS.ButtonShell} >
                    <MenuButton  
                    
                    btnName="Profile" btn_Pic_Src={profileIcon} 
                    onclick={() => navigate("/avaliability_Faculty")}>

                    </MenuButton>
                    </div>


            {/* ********************2 TESTED BUTTON here ******************************/}

                    <div className={facultyLandingPgCSS.ButtonShell}>
                        <DropDownMenuButton btnName="textDropDown" btn_Pic_Src={testIcon}
                        showDropDown={buttonDropDownStatusList[0].showDropDown}
                        BtnClickHandler={()=>handelBtnClick(0)}>
                            
                            {/* Drop down options */}
                        {/* {[option name, routeLink]}       */}
                            {["hello","/display"]}
                            {["world","/display"]}

                        </DropDownMenuButton>

                    </div>

                    <div className={facultyLandingPgCSS.ButtonShell}>
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
        



                    <div className={facultyLandingPgCSS.ButtonShell} >
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
 
export default FacultyLandingPg;