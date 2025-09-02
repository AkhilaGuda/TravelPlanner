import React,{useEffect,useState} from "react";
import axios from "axios";
import DisplayItineraries from "./DisplayItineraries";
export default function ItineraryList(){
    const[itineraries,setItineraries]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/itineraries')
        .then((res)=>setItineraries(res.data))
        .catch(error=>console.error(error.message));    
    },[]);

    return(
        <DisplayItineraries itineraries={itineraries} />
    );
}