import React from 'react'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Content = () => {
  return (
    <div>

      <Router>
        <Sidebar />
      </Router>
    </div>
  )
}

export default Content