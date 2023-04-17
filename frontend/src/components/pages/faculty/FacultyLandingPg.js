import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import facultyLandingPgCSS from '../../../styles/facultyLanding.module.css'
import MenuButton from '../../PgComponents/MenuButton';
import avalaibilityIcon from "../../../images/Avaliability Menu Icon.png"
import preferenceIcon from "../../../images/Preference Menu Icon.png"
import scheduleIcon from "../../../images/Schedule Menu Icon.png"
import profileIcon from "../../../images/Profile Menu Icon.png"
import logOutIcon from "../../../images/logout Menu Icon.png"
import { LoggedInUserContext } from "../../../App.js" //import the use context variable



const FacultyLandingPg = (props) => {

    let navigate = useNavigate();
    let userData = useContext(LoggedInUserContext); // grab the user data from the useContext

    return (
        <React.Fragment>
            <div id={facultyLandingPgCSS.myPageBody} >
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
                            onclick={() => navigate("/FacultyAvaliability")}>

                        </MenuButton>
                    </div>


                    <div className={facultyLandingPgCSS.ButtonShell} >
                        <MenuButton

                            btnName="Preferences" btn_Pic_Src={preferenceIcon}
                            onclick={() => navigate("/FacultyPreference")}>

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

                    <div className={facultyLandingPgCSS.ButtonShell} >
                        <MenuButton

                            btnName="Logout" btn_Pic_Src={logOutIcon}
                            onclick={() => {
                                props.clearLoginData(); navigate("/");
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