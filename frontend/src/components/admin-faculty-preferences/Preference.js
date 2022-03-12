// This file is to create a preference that the faculty has requested

import React from 'react'
import "../../styles/adminFacultyPreferences.css"

const Preference = ({ preference }) => {
  return (
    <>
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
    </>
  )
}

export default Preference