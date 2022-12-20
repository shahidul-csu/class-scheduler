// This file is going to display the top nav bar 

import React, { useContext } from 'react';
import '../../styles/Header.css'
import HomeIcon from '../../images/Home.png'
import {LoggedInUserContext} from "../../App.js"

const Header = () => {
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

  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <a className='as' href="#"><h1>Class Scheduler</h1></a>
              {homeButtonCreator()}
          </div>
      </div>
    </div>
  )
}

export default Header