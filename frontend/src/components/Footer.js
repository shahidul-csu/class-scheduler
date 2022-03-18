/* This file is going to display the footer for all/most pages */

import React from "react";
import "../styles/Footer.css"

const Footer = () =>  {
    return(
        <div className="footer">
            <p> This site is based on the <a href="https://github.com/shahidul-csu/class-scheduler"> Class Scheduler</a> project.</p>
            <p> Modifications by students and faculty at Cal. State University, Monterey Bay.</p>
            <p> Site version: ####</p>
        </div>
    )
}

export default Footer;