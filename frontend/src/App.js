import React, { useState, useEffect, createContext, useCallback } from "react";
import './App.css';
import Header from './components/PgComponents/Header'
import Footer from './components/PgComponents/Footer.js'
import LandingPage from './components/pages/generalPages/LandingPage';
import AdminPage from './components/pages/admin/AdminLandingPg';
import AddClass from './components/pages/admin/AddClass';
import GenSchedule from "./components/pages/admin/GenSchedule";
import UserManagement from './components/pages/admin/UserManagementPg'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsUsers from './components/settings/SettingsUsers';

import AddUserPg from "./components/pages/admin/AddUserPg";
import AddCoursePg from "./components/pages/admin/AddCoursePg";
import CourseClassroom from "./components/pages/admin/CourseClassroom";
import InstructorCourse from "./components/pages/admin/InstructorCourse";
import CourseTime from "./components/pages/admin/CourseTime";
import AddSemester from "./components/pages/admin/AddSemester";
import CourseSemester from "./components/pages/admin/CourseSemester";
import FacultyLandingPg from "./components/pages/faculty/FacultyLandingPg";
import AllClassrooms from "./components/pages/admin/AllClassrooms";
import AllCourses from "./components/pages/admin/AllCourses";
import FacultyAvaliabiltyPg from "./components/pages/faculty/FacultyAvaliabilityPg";
import FacultyPreferencePg from "./components/pages/faculty/FacultyPreferencePg";
import FacultyProtectedRoutes from "./components/PgComponents/FacultyProtectedRoutes";
import LoginHandler from "./components/PgComponents/QuickLoginHandler"; //LoginHandler-- handels login
import AdminProtectedRoutes from "./components/PgComponents/AdminProtectedRoutes";
import ApproveDeny from "./components/pages/admin/ApproveDeny";
import "./styles/Dropdown.css" //Dont remove. customizes all dropdowns in website



export const LoggedInUserContext = createContext(); //passes the user details to all the pages

function App() {
  let currentlyLoggedInUser = JSON.parse(localStorage.getItem("LoggedInUsrData"))

  const [loggedInUserData, setLoggedInUserData] = useState(currentlyLoggedInUser ?
    currentlyLoggedInUser : null); //state vars

  const UpdateStateVarAndLocalStorage = (data) => {
    // used to update loggedInUserData and the local storage
    localStorage.setItem("LoggedInUsrData", JSON.stringify(data.userData))
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)

    setLoggedInUserData(data.userData)
  }

  const ClearStateVarAndLocalStorage = () => {
    // function called during logout
    localStorage.clear('LoggedInUsrData')
    localStorage.clear('token')
    localStorage.clear('userId')
    setLoggedInUserData(null)
  }

  return (
    <div>


      <LoggedInUserContext.Provider value={loggedInUserData}>
        <Header logoutFunc={ClearStateVarAndLocalStorage} />
        <BrowserRouter>
          <Routes>
            <Route element={<LoginHandler></LoginHandler>}>
              <Route path="/" element={<LandingPage updateLoggedInUserData={UpdateStateVarAndLocalStorage}></LandingPage>}></Route>
            </Route>
            <Route path="/settingsUser" element={<SettingsUsers></SettingsUsers>}></Route>

            <Route element={<AdminProtectedRoutes></AdminProtectedRoutes>}>
              {/* Must be logged in as a admin to view this pages. */}

              <Route path="/adminpage" element={<AdminPage clearLoginData={ClearStateVarAndLocalStorage} />}></Route>

              <Route path="/addclass" element={<AddClass />}></Route>
              <Route path="/usermanagement" element={<UserManagement />}></Route>
              <Route path="/allclassrooms" element={<AllClassrooms />}></Route>
              <Route path="/allcourses" element={<AllCourses />}></Route>
              {/* <Route path="/data" element={<Data></Data>}></Route> */}
              <Route path="/addUser" element={<AddUserPg></AddUserPg>}></Route>
              <Route path="/addCourse2" element={<AddCoursePg></AddCoursePg>}></Route>
              <Route path="/genschedule" element={<GenSchedule></GenSchedule>}></Route>
              <Route path="/CourseClassroom" element={<CourseClassroom></CourseClassroom>}></Route>
              <Route path="/InstructorCourse" element={<InstructorCourse></InstructorCourse>}></Route>
              <Route path="/CourseTime" element={<CourseTime></CourseTime>}></Route>
              <Route path="/AddSemester" element={<AddSemester></AddSemester>}></Route>
              <Route path="/CourseSemester" element={<CourseSemester></CourseSemester>}></Route>
              <Route path="/ApproveDeny" element={<ApproveDeny></ApproveDeny>}></Route>
            </Route>

            <Route element={<FacultyProtectedRoutes></FacultyProtectedRoutes>}>
              {/* Must be logged in as a faculty to view this pages. */}
              <Route path="/FacultyLandingPg" element={<FacultyLandingPg clearLoginData={ClearStateVarAndLocalStorage}></FacultyLandingPg>}></Route>
              <Route path="/FacultyAvaliability" element={<FacultyAvaliabiltyPg></FacultyAvaliabiltyPg>}></Route>
              <Route path="/FacultyPreference" element={<FacultyPreferencePg></FacultyPreferencePg>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoggedInUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
