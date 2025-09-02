import React,{useState,useEffect} from "react";
import { useAuth } from "../../authentication/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Paper, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import UserJoinedTrips from "./UserJoinedTrips";
import ProfileButtons from "./ProfileButtons";
import { useLocation } from "react-router-dom";
export default function Profile(){
    const user=useAuth();
         const location = useLocation();
          const isBaseProfile = location.pathname === "/profile";
    return(
        <div>
        <div style={{paddingTop:"20px",fontSize:"30px",paddingBottom:"20px"}}>Welcome, <strong>{user?.displayName || "Guest"}</strong></div>
            {isBaseProfile && <ProfileButtons />}
        
            <Outlet />
        
    

        </div>
    )
}