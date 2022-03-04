// This file is going to display the top nav bar of the admin faculty preferneces page

import React from 'react'
import '../../styles/adminFacultyPreferences.css'

const Header = () => {
  return (
    <div>
      <div className='heading'>
          <div className='navbar'>
              <h1>Class Scheduler</h1>
                <ul className='nav_links'>
                    <li className='lists'><a className='as' href='#'>Update Options</a></li>
                    <li className='lists'><a className='as' href='#'>Schedule</a></li>
                    <li className='lists'><a className='as' href='#'>Preferences</a></li>
                </ul>
          </div>
          
      </div>
      <hr></hr>
    </div>
  )
}

export default Header