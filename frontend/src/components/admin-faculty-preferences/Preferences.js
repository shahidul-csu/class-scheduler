// This file creates the table view and generates preferences

import React from 'react'
import "../../styles/adminFacultyPreferences.css"
import Preference from './Preference'

const Preferences = ({ preferences }) => {
  return (
    <div>
        <div className='app-container'>
            <table>
                <thead>
                    <tr>
                        <th className='col-header'>Weekday</th>
                        <th className='col-header'>Timeslot</th>
                        <th className='col-header actions'>Approve</th>
                        <th className='col-header actions'>Deny</th>
                    </tr>
                </thead>
                <tbody>
                    {preferences.map((preference) => (
                        
                            <Preference key={preference.id} id={preference.id} preference={preference}/>
                        
                    ))}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Preferences