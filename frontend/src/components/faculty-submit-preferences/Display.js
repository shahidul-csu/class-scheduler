import React from 'react'
import Content from './Content'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Display = () => {
    return (
        <div className="Parent">
          <div className="Row">
              <div className="Col1">
                <div className="Left">
                    <Router>
                        <Sidebar />
                    </Router>
                </div>
              </div>
              <div className="Col2">
                <div className="Right">
                    {/* <Content /> */}
                </div>
              </div>
            </div>
        </div>
      )
}

export default Display