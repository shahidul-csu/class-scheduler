// This page will hold both the left professors/semesters drop downs, and the preferences to accept for professors on the right side.

import React, { useState } from 'react'
import Dropdown from './Dropdown'
import '../../styles/adminFacultyPreferences.css'
import Preferences from './Preferences'
import Submit from './Submit'

const Display = () => {

  // Dummy data
  const [professors, setProfessors] = useState([
    {id:1, last_name: "Espinoza"}, 
    {id:2, last_name: "Lara"}, 
    {id:3, last_name: "Su"},
  ])
  const [semesters, setSemesters] = useState([
    {id: 1, user_id: 1,name: "fall", year: "2019"},
    {id: 2, user_id: 2,name: "spring", year: "2021"},
    {id: 3, user_id: 2,name: "spring", year: "2019"},
    {id: 4, user_id: 1,name: "fall", year: "2020"},
    {id: 5, user_id: 3,name: "fall", year: "2019"},
    {id: 6, user_id: 3,name: "spring", year: "2022"},
    {id: 7, user_id: 2,name: "fall", year: "2020"},
  ])
  
  const [preferences, setPreferences] = useState([
    {"id": 1, "weekday": "Monday", "timeslot": "10am-12pm"},
    {"id": 2, "weekday": "Wednesday", "timeslot": "2pm-4pm"},
    {"id": 3, "weekday": "Thursday", "timeslot": "10am-12pm"},
    {"id": 4, "weekday": "Tuesday", "timeslot": "6pm-8pm"},
])

  return (
    <div>
        <div className='parent'>
            <div className='left'>
                <Dropdown name="Professor" group={professors}/>
                <Dropdown name="Semester" group={semesters} />
            </div>
            <div className='right'>
                <Preferences preferences={preferences} />
                <Submit />
            </div>
        </div>
    </div>
  )
}

export default Display