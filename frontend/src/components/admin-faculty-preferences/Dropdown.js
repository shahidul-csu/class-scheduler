// This file will create a drop down to be used to create the professors and theh semesters drop down on the left of the screen. 

import React from 'react'
import '../../styles/dropdown.css'

const Dropdown = ({ name, professors }) => {
  return (
    <div className='dropdown'>
        <p>Professors</p>
        {/* <form action="#"> */}
        <div className='custom-select'>
            <select name={name} id={name}>
                {professors.map((professor) => (
                    <option value={professor.id}>{professor.last_name}</option>
                ))}
            </select>
            <span className='custom-arrow'></span>
        </div>
        {/* </form> */}
    </div>
  )
}

export default Dropdown