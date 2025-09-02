import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useAuthLoading } from "../authentication/useAuth";
import { toast } from "react-toastify";
export default function ProtectedRoute({children}){
    const user=useAuth();
    const loading=useAuthLoading();
    if(loading){
        return <h3>Loading...</h3>;
    }
    // console.log(user);
    if(!user){
        return <Navigate to="/login" replace />
    }
     return children;
}