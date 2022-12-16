import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import {LoggedInUserContext} from "../App.js" //import the use context variable



const LoginHandler = () => {
    let LoginUserData = useContext(LoggedInUserContext)

    if(LoginUserData){
        if(LoginUserData.is_superuser){
            return <Navigate to="/adminpage" ></Navigate> //go to admin page
        }
        else{
            return <Navigate to="/FacultyLandingPg" ></Navigate> //user is not logged in.
        }
    }
    else{
        return <Outlet/>; // Goes to login page 
    }

}
export default LoginHandler;