import React, {useState, useEffect,createContext, useCallback} from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer.js'
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import AdminPage from './components/admin/AdminPage';
import Display from './components/faculty-submitAvailability/Display';
import AddClass from './components/pages/AddClass';
import GenSchedule from "./components/pages/GenSchedule";
import UserManagement from './components/admin/UserManagement'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SettingsInfo from './components/settings/SettingsInfo';
import SettingsUsers from './components/settings/SettingsUsers';
import SettingsAddCourse from './components/settings/SettingsAddCourse';
import SettingsAddClassroom from './components/settings/SettingsAddClassroom';
import AddUserPg from "./components/pagesOO/adminPg/AddUserPg";
import AddCoursePg from "./components/pagesOO/adminPg/AddCoursePg";
import CourseClassroom from "./components/pagesOO/adminPg/CourseClassroom";
import InstructorCourse from "./components/pagesOO/adminPg/InstructorCourse";
import CourseTime from "./components/pagesOO/adminPg/CourseTime";
import AddSemester from "./components/pagesOO/adminPg/AddSemester";
import CourseSemester from "./components/pagesOO/adminPg/CourseSemester";
import FacultyLandingPg from "./components/pagesOO/facultyPg/FacultyLandingPg";
import AllClassrooms from "./components/pagesOO/adminPg/AllClassrooms";
import AllCourses from "./components/pagesOO/adminPg/AllCourses";
import AdminAvailability from "./components/pagesOO/adminPg/AdminAvailability";
import FacultyAvaliabiltyPg from "./components/pagesOO/facultyPg/FacultyAvaliabilityPg";
import FacultyProtectedRoutes from "./components/FacultyProtectedRoutes";
import LoginHandler from "./components/QuickLoginHandler"; //LoginHandler-- handels login
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";


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
            <Route element={<LoginHandler></LoginHandler>}>
              <Route path="/" element={<LandingPage updateLoggedInUserData = {UpdateStateVarAndLocalStorage}></LandingPage>}></Route>
              </Route>


              <Route element={<AdminProtectedRoutes></AdminProtectedRoutes>}>
                {/* Must be logged in as a admin to view this pages. */}

              <Route path="/settings" element={<SettingsInfo></SettingsInfo>}></Route>
              <Route path="/settingsUser" element={<SettingsUsers></SettingsUsers>}></Route>
              <Route path="/AddCourse" element={<SettingsAddCourse></SettingsAddCourse>}></Route>
              <Route path="/AddClassroom" element={<SettingsAddClassroom></SettingsAddClassroom>}></Route>
              <Route path="/welcome" element={<Welcome/>}></Route>
              <Route path="/adminpage" element={<AdminPage/>}></Route>

              <Route path="/addclass" element={<AddClass/>}></Route>
              <Route path="/usermanagement" element={<UserManagement/>}></Route>
              <Route path="/allclassrooms" element={<AllClassrooms/>}></Route>
              <Route path="/allcourses" element={<AllCourses/>}></Route>
              <Route path="/adminavailability" element={<AdminAvailability/>}></Route>
              {/* <Route path="/data" element={<Data></Data>}></Route> */}
              <Route path="/addUser" element={<AddUserPg></AddUserPg>}></Route>
              <Route path="/addCourse2" element={<AddCoursePg></AddCoursePg>}></Route>
              <Route path="/genschedule" element={<GenSchedule></GenSchedule>}></Route>
              <Route path="/CourseClassroom" element={<CourseClassroom></CourseClassroom>}></Route>
              <Route path="/InstructorCourse" element={<InstructorCourse></InstructorCourse>}></Route>
              <Route path="/CourseTime" element={<CourseTime></CourseTime>}></Route>
              <Route path="/AddSemester" element={<AddSemester></AddSemester>}></Route>
              <Route path="/CourseSemester" element={<CourseSemester></CourseSemester>}></Route>
              </Route>

              <Route element={<FacultyProtectedRoutes></FacultyProtectedRoutes>}>
                {/* Must be logged in as a faculty to view this pages. */}
                <Route path="/display"  element={<Display />} ></Route>
              <Route path="/FacultyLandingPg" element={<FacultyLandingPg clearLoginData={ClearStateVarAndLocalStorage}></FacultyLandingPg>}></Route>
              <Route path="/FacultyAvaliability" element={<FacultyAvaliabiltyPg></FacultyAvaliabiltyPg>}></Route>

              </Route>
          </Routes>
        </BrowserRouter>
        </LoggedInUserContext.Provider>
      <Footer/>
    </div>
  );
}

export default App;
