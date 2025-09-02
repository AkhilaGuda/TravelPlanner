import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import DisplayItineraries from "./DisplayItineraries";
import { useAuth } from "../authentication/useAuth";
import { toast } from "react-toastify";
export default function CityItineraries({ }) {
    const { city } = useParams();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const user=useAuth();
    async function fetchCityItineraries(){
        try {
            const response = await axios.get(`http://localhost:5000/itineraries?destination=${city}`);
            setItineraries(response.data);
            // console.log(response);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            toast.error("Unable to fetch itineraries, try again");
        }
    }
    useEffect( () => {
        fetchCityItineraries();
    }
    , [city]);
    if(loading){<p>Loading....</p>}

    const handleCreate=()=>{
        if(!user){
            toast.info("please login to continue");
        }
    }
    return (
        <div>
            <div style={{display:"flex",justifyContent:"center",padding:"20px"}}>
            <div style={{fontSize:"30px",fontWeight:"50px",paddingRight:"15px"}}>{city.toUpperCase()}</div>
            <div>
                <Button variant="outlined" color="primary" component={Link}  onClick={handleCreate} to="/createItinerary"  >
                        Create Itinerary
                    </Button>
            </div>
            </div>
            <DisplayItineraries itineraries={itineraries} />
            {/* {console.log(itineraries)} */}
        </div>
    );
}