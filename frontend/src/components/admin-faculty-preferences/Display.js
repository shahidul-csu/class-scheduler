// This page will hold both the left professors/semesters drop downs, and the preferences to accept for professors on the right side.

import React from 'react'
import Dropdown from './Dropdown'
import '../../styles/adminFacultyPreferences.css'

const Display = () => {
  let professors = [{id:1, last_name: "Espinoza"}, {id:1, last_name: "Lara"}, {id:1, last_name: "Su"}]
  return (
    <div>
        <div className='parent'>
            <div className='left'>
                fdfd
                <Dropdown name="Professors" professors={professors}/>
            </div>
            <div className='right'>
                right
            </div>
        </div>
    </div>
  )
}

export default Display