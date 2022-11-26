// This file is going to display the top nav bar 

import React, { useContext } from 'react';
import '../styles/Header.css'
import HomeIcon from '../images/Home.png'
import {LoggedInUserContext} from "../App.js"

const Header = (props) => {
  let userData = useContext(LoggedInUserContext);
  
  const homeButtonCreator = ()=>{
    if(userData){
      if(userData.is_superuser){
         
        return <a href='/AdminPage'><img style={{width: 35, height:35}} src={HomeIcon} alt="HomeIcon"></img></a>
      }
      else{
        return <a href='/FacultyLandingPg'><img style={{width: 35, height:35}} src={HomeIcon} alt="HomeIcon"></img></a>
      }
    }
    

  }

  const tempLogoutLink = () => { //for testing purposes only(Admin)(Bad code)
    if(userData){
      if(userData.is_superuser){
        return <ul className='nav_links' id='link_display_option'>

        <li className='lists' onClick={()=>props.logoutFunc()}><a className='as' href='/' >Logout</a></li>
    </ul> 
      }

    }
  }

  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <a className='as' href="/"><h1>Class Scheduler</h1></a>
              {homeButtonCreator()}

              {tempLogoutLink()}

                {/* <ul className='nav_links' id='link_display_option'>
                    <li className='lists'><a className='as' href='#'>Update Options</a></li>
                    <li className='lists'><a className='as' href='/data'>Schedule</a></li>
                    <li className='lists'><a className='as' href='#'>Preferences</a></li>
                    <li className='lists'><a className='as' href='/settings'>Settings</a></li>
                    <li className='lists' onClick={()=>props.logoutFunc()}><a className='as' href='/' >Logout</a></li>
                </ul> */}
          </div>
      </div>
    </div>
  )
}

export default Header