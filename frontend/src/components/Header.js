// This file is going to display the top nav bar 

import React from 'react'
import '../styles/Header.css'

const Header = () => {
  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <h1>Class Scheduler</h1>
                <ul className='nav_links' id='link_diplay_option'>
                    <li className='lists'><a className='as' href='#'>Update Options</a></li>
                    <li className='lists'><a className='as' href='#'>Schedule</a></li>
                    <li className='lists'><a className='as' href='#'>Preferences</a></li>
                    <li className='lists'><a className='as' href='/settings'>Settings</a></li>
                </ul>
          </div>
      </div>
    </div>
  )
}

export default Header