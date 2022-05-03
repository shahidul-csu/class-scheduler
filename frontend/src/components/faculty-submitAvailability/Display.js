// This page will hold both the left professors/semesters drop downs, and the preferences to accept for professors on the right side.

import React, { useState } from 'react';
import PreferenceDropdown from './PreferenceDropdown';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../../styles/Display.css';

const Display = () => {

  // Dummy data
  const [semesters, setSemesters] = useState([
    {id:1, last_name: "Fall 2020"}, 
    {id:2, last_name: "Spring 2021"}, 
    {id:3, last_name: "Fall 2021"},
  ])
  const [courses, setCourses] = useState([
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
                  <Dropdown name="Semester" group={semesters}/>
                  <Dropdown name="Course" group={courses} />
            </div>
          </div>
          <div className="Col2">
            <div className="Right">
                      <PreferenceDropdown />

                      {/* Error: Can not have routes inside routes. We need to pass info if not the dropsown doens't work correctly */}

                      {/* <Router>
                      <PreferenceDropdown />
                      </Router> */}
                  <button className='submission'>Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Display