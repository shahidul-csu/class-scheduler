// This file will create a drop down to be used to create the professors and theh semesters drop down on the left of the screen.
// This file will create a drop down to be used to create the professors and theh semesters drop down on the left of the screen.

/*
  NOTES
  - have to figure out which professor was selected so you can generate all the semesters they have/had preferences
  - have to figure out which semester was selected so you can generate all the preferences thay have/had for that semester
  */

import React from 'react'
import '../../styles/Dropdown.css'

const Dropdown = ({ name, group, onSelected }) => {
    return (
      <div className='dropdown'>
          <h3>{name}</h3>
          <form action="#">
            <div className='custom-select'>
                <select name={name} id={name}>
                  <option value="0">Select {name}:</option>
                  {group.map((obj) => (
                      <option value={obj.id}>
                        {obj.hasOwnProperty('last_name') ? obj.last_name : obj.name}
                      </option>
                  ))}
                </select>
            </div>
          </form>
      </div>
    )
}

export default Dropdown