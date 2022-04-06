import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Display from './components/admin-faculty-preferences/Display';

function App() {
  return (
    <div>
      <Header />
      {/* <LandingPage/> */}

      <Display/>
      <Footer/>
    </div>
  );
}

export default App;
