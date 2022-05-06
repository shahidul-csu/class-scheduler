import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Display from './components/faculty-submitAvailability/Display';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PreferenceTimes from './components/faculty-submitAvailability/PreferenceTimes';
import PreferenceDropdown from './components/faculty-submitAvailability/PreferenceDropdown';
import Data from './components/faculty-submitAvailability/Data';
import Dropdown from './components/faculty-submitAvailability/Dropdown';
import SettingsInfo from './components/settings/SettingsInfo';
import SettingsUsers from './components/settings/SettingsUsers';

function App() {
  return (
    <div>
      <Header />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage></LandingPage>}></Route>
              <Route path="/settings" element={<SettingsInfo></SettingsInfo>}></Route>
              <Route path="/settingsUser" element={<SettingsUsers></SettingsUsers>}></Route>
              <Route path="/display" element={<Display/>}></Route>
          </Routes>
        </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
