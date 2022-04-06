import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';

import Sidebar from './components/faculty-submit-preferences/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './components/faculty-submit-preferences/Content';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Sidebar />
      </Router>
      <Content />
      <Footer />
    </div>
  );
}

export default App;
