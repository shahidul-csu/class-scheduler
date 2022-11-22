import React, { useContext } from 'react';
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import {LoggedInUserContext} from "../App.js" //import the use context variable

const IsFaculty = () => {
let LoginUserData = useContext(LoggedInUserContext)

    let returnVal = null;

    if(LoginUserData){
    if(LoginUserData.is_superuser){
        returnVal = false; //means the logged In user is admin
    }
    else{
            returnVal = true;
    }
}

    return returnVal;
}

const FacultyProtectedRoutes = () => {
    let isauthenticated = IsFaculty();

        if(isauthenticated){
            return <Outlet/>; // Goes to the route 
        }
        else{

            if(isauthenticated === null){
             return <Navigate to="/" ></Navigate> //user is not logged in.
            }
            else{
               return <Navigate to="/settings" ></Navigate>
            }
        }
}
export default FacultyProtectedRoutes;