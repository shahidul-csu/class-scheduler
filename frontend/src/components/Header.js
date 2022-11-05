// This file is going to display the top nav bar 

import React from 'react'
import '../styles/Header.css'

const Header = (props) => {
  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <a className='as' href="/"><h1>Class Scheduler</h1></a>
                <ul className='nav_links' id='link_display_option'>
                    <li className='lists'><a className='as' href='#'>Update Options</a></li>
                    <li className='lists'><a className='as' href='/data'>Schedule</a></li>
                    <li className='lists'><a className='as' href='#'>Preferences</a></li>
                    <li className='lists'><a className='as' href='/settings'>Settings</a></li>
                    <li className='lists' onClick={()=>props.logoutFunc()}><a className='as' href='/' >Logout</a></li>
                </ul>
          </div>
      </div>
    </div>
  )
}

export default Header