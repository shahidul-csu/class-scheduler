import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import AdminPage from './components/admin/AdminPage';
import FacultyLanding from './components/pages/FacultyLanding';
import Display from './components/faculty-submitAvailability/Display';
import AddClass from './components/pages/AddClass';
import UserManagement from './components/admin/UserManagement'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PreferenceTimes from './components/faculty-submitAvailability/PreferenceTimes';
import PreferenceDropdown from './components/faculty-submitAvailability/PreferenceDropdown';
import Data from './components/faculty-submitAvailability/Data';
import Dropdown from './components/faculty-submitAvailability/Dropdown';
import SettingsInfo from './components/settings/SettingsInfo';
import SettingsUsers from './components/settings/SettingsUsers';
import SettingsAddCourse from './components/settings/SettingsAddCourse';
import SettingsAddClassroom from './components/settings/SettingsAddClassroom';

function App() {
  return (
    <div>

        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage></LandingPage>}></Route>
              <Route path="/settings" element={<SettingsInfo></SettingsInfo>}></Route>
              <Route path="/settingsUser" element={<SettingsUsers></SettingsUsers>}></Route>
              <Route path="/AddCourse" element={<SettingsAddCourse></SettingsAddCourse>}></Route>
              <Route path="/AddClassroom" element={<SettingsAddClassroom></SettingsAddClassroom>}></Route>
              <Route path="/display" element={<Display/>}></Route>
              <Route path="/welcome" element={<Welcome/>}></Route>
              <Route path="/adminpage" element={<AdminPage/>}></Route>
              <Route path="/facultylanding" element={<FacultyLanding/>}></Route>
              <Route path="/addclass" element={<AddClass/>}></Route>
              <Route path="/usermanagement" element={<UserManagement/>}></Route>
              {/* <Route path="/data" element={<Data></Data>}></Route> */}
          </Routes>
        </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
