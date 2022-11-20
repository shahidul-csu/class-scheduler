import React, {useState, useEffect,createContext, useCallback} from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import AdminPage from './components/admin/AdminPage';
import Display from './components/faculty-submitAvailability/Display';
import AddClass from './components/pages/AddClass';
import UserManagement from './components/admin/UserManagement'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsInfo from './components/settings/SettingsInfo';
import SettingsUsers from './components/settings/SettingsUsers';
import SettingsAddCourse from './components/settings/SettingsAddCourse';
import SettingsAddClassroom from './components/settings/SettingsAddClassroom';
import AddUserPg from "./components/pagesOO/adminPg/AddUserPg";
import AddCoursePg from "./components/pagesOO/adminPg/AddCoursePg";
import FacultyLandingPg from "./components/pagesOO/facultyPg/FacultyLandingPg";

export const LoggedInUserContext = createContext(); //passes the user details to all the pages

function App() {
  let currentlyLoggedInUser = JSON.parse(localStorage.getItem("LoggedInUsrData"))

   const [loggedInUserData, setLoggedInUserData] = useState(currentlyLoggedInUser? 
    currentlyLoggedInUser : null); //state vars

  const UpdateStateVarAndLocalStorage = (data) => { 
    // used to update loggedInUserData and the local storage
    localStorage.setItem("LoggedInUsrData",  JSON.stringify(data.userData))
    localStorage.setItem('token', data.token)
    
    setLoggedInUserData(data.userData)
  }

  const ClearStateVarAndLocalStorage= () => { 
    // function called during logout
    localStorage.clear('LoggedInUsrData')
    localStorage.clear('token')
    setLoggedInUserData(null)
  }

  return (
    <div>


      <LoggedInUserContext.Provider value={loggedInUserData}>
      <Header logoutFunc={ClearStateVarAndLocalStorage}/>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage updateLoggedInUserData = {UpdateStateVarAndLocalStorage}></LandingPage>}></Route>
              <Route path="/settings" element={<SettingsInfo></SettingsInfo>}></Route>
              <Route path="/settingsUser" element={<SettingsUsers></SettingsUsers>}></Route>
              <Route path="/AddCourse" element={<SettingsAddCourse></SettingsAddCourse>}></Route>
              <Route path="/AddClassroom" element={<SettingsAddClassroom></SettingsAddClassroom>}></Route>
              <Route path="/display"  element={<Display />} ></Route>
              <Route path="/welcome" element={<Welcome/>}></Route>
              <Route path="/adminpage" element={<AdminPage/>}></Route>
              <Route path="/addclass" element={<AddClass/>}></Route>
              <Route path="/usermanagement" element={<UserManagement/>}></Route>
              {/* <Route path="/data" element={<Data></Data>}></Route> */}
              <Route path="/addUser" element={<AddUserPg></AddUserPg>}></Route>
              <Route path="/addCourse2" element={<AddCoursePg></AddCoursePg>}></Route>
              <Route path="/FacultyLandingPg" element={<FacultyLandingPg clearLoginData={ClearStateVarAndLocalStorage}></FacultyLandingPg>}></Route>
          </Routes>
        </BrowserRouter>
        </LoggedInUserContext.Provider>
      <Footer/>
    </div>
  );
}

export default App;
