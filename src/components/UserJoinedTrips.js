import React,{useState,useEffect} from "react";
import { useAuth } from "../authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayJoinedItineraries from "./DisplayJoinedItineraries";
export default function UserJoinedTrips(){
    const user=useAuth();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(user);
    
    const userEmail=user?.email;
    // console.log(userEmail);

   const fetchJoinedItineraries=async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/user?userEmail=${userEmail}`);
            // const result=await response.json();
            // console.log(response);
            setItineraries(response.data);
          
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }
    // console.log(user)
    useEffect(()=>{
        
        fetchJoinedItineraries(); 
        
    },[]);
    if(loading) { return <p>Loading...</p>}
    return (
            <DisplayJoinedItineraries itineraries={itineraries} onExit={fetchJoinedItineraries}/>

    );
}