// This file is going to display the top nav bar of the admin faculty preferneces page

import React from 'react'
import '../../styles/adminFacultyPreferences.css'

const Header = () => {
  return (
    <div>
        <div className='navbar'>
            <h1>Class Scheduler</h1>
            <nav>
                <ul className='nav_links'>
                    <li><a href='#'>Update Options</a></li>
                    <li><a href='#'>Schedule</a></li>
                    <li><a href='#'>Preferences</a></li>
                </ul>
            </nav>
        </div>
        <hr></hr>
    </div>
  )
}

export default Header