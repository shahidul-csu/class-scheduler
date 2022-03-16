import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div>
      <Header />
      <LandingPage/>
      <Footer/>
    </div>
  );
}

export default App;
