import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';

import FacultyDisplay from './components/faculty-submit-preferences/Display';
import AdminDisplay from './components/admin-faculty-preferences/Display'

function App() {
  return (
    <div>
      <Header />
      <FacultyDisplay />
      <Footer/>

      {/* <Header />
      <AdminDisplay />
      <Footer/> */}
    </div>
  );
}

export default App;
