// This file is to create a preference that the faculty has requested

import React from 'react'
import "../../styles/adminFacultyPreferences.css"

const Preference = ({ preferences }) => {
  return (
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
                    <tr>
                        <td>{preference.weekday}</td>
                        <td>{preference.timeslot}</td>
                        <td className='action-td'>
                            <button
                                className='action-btn'
                                type="button"
                                onClick={() => console.log("hello")}
                            >
                            </button>
                            
                        </td>
                        <td className='action-td'>
                            <button 
                                className='action-btn'
                                type="button" 
                                onClick={() => console.log("hello")}
                            >
                            </button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default Preference