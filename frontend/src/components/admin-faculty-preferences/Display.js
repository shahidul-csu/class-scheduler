// This page will hold both the left professors/semesters drop downs, and the preferences to accept for professors on the right side.

import React, { useState } from 'react'
import Dropdown from './Dropdown'
import '../../styles/Display.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreferenceDropdown from './PreferenceDropdown';


const Display = () => {

  // Dummy data
  const [professors, setProfessors] = useState([
    {id:1, last_name: "Espinoza"}, 
    {id:2, last_name: "Lara"}, 
    {id:3, last_name: "Su"},
  ])
  const [semesters, setSemesters] = useState([
    {id: 1, user_id: 1,name: "CST 370"},
    {id: 2, user_id: 2,name: "CST 338"},
    {id: 3, user_id: 2,name: "CST 438"},
    {id: 4, user_id: 1,name: "CST 497"},
  ])

  return (
    <div className="Parent">
      <div className="Row">
          <div className="Col1">
            <div className="Left">
                  <Dropdown name="Professor" group={professors}/>
                  <Dropdown name="Course" group={semesters} />
            </div>
          </div>
          <div className="Col2">
            <div className="Right">
                  <Router>
                      <PreferenceDropdown />
                  </Router>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Display