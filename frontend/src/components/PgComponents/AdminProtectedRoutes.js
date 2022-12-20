import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import {LoggedInUserContext} from "../../App.js" //import the use context variable

const IsAdmin = () => {
let LoginUserData = useContext(LoggedInUserContext)

    let returnVal = null;

    if(LoginUserData){
    if(LoginUserData.is_superuser){
        returnVal = true; //means the logged In user is admin
    }
    else{
            returnVal = false;
    }
}

    return returnVal;
}

const AdminProtectedRoutes = () => {
    let isauthenticated = IsAdmin();

        if(isauthenticated){
            return <Outlet/>; // Goes to the route 
        }
        else{

            if(isauthenticated === null){
             return <Navigate to="/" ></Navigate> //user is not logged in.
            }
            else{
               return <Navigate to="/FacultyLandingPg" ></Navigate> 
               //user get redirected to faculty landing page. 
            }
        }
}
export default AdminProtectedRoutes;