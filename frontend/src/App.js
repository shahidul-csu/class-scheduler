import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Display from './components/admin-faculty-preferences/Display';
import {Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={ 
         <div>
            <Header />
            <LandingPage /> 
            <Footer />
         </div> 
        } />
        <Route path='/login' element={ 
         <div>
            <Header />
            <Display /> 
            <Footer />
         </div> 
        }/>

      </Routes>
    </Router>
  );
  
}



      
export default App;
