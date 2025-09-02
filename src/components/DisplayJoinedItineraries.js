import React,{useState} from "react";
import { TextField, Button, Card, Box, Paper, Stack, Typography } from "@mui/material";
import TravelBg from '../images/Travel_bg1.png';
import { toast } from "react-toastify";
import axios from "axios";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
export default function DisplayJoinedItineraries({itineraries,onExit}){
    
    const handleExit =async(trip)=>{
      try{
        await axios.delete(`http://localhost:5000/user/${trip.id}`);
            toast.success("exited from itinerary.");
           onExit();
      }
      catch(error){
        console.log(error);
        toast.error("Try again");
      }
    }
  return(
    <div>
    <Box> 
    
        {itineraries.length!==0 && <h2>Joined Itineraries</h2>}
        <div style={{
                            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px"
                           
                        }}>
                            {!itineraries || itineraries.length===0 ? (<p>Joined Itineraries are empty</p>) : (
                                itineraries.map((trip, idx) => (
                                    trip.item?(
                                    <Card key={trip.id} sx={{ p: 2, height: "30vh", width: "30vw", backgroundColor: "#f0f0f0" }}>
                                        <Typography><strong>Destination: {trip.item.destination}</strong></Typography>
                                        <Typography><strong>Days: </strong>{trip.item.days}</Typography>
                                        <Typography><strong>Dates: </strong>{trip.item.dates[0]} to {trip.item.dates[1]}</Typography>
                                        <Typography><strong>Description: </strong>{trip.item.description}</Typography>
                                        <Typography><strong>Budget per person: ₹</strong>{trip.item.budget}</Typography>
                                        <Typography><strong>Group Size: </strong>{trip.item.groupSize}</Typography>
                                       <Button type="submit"    onClick={()=>handleExit(trip)}><RemoveCircleIcon sx={{color:"red"}}/></Button>
                                    </Card>)
                                    :(<p>this trip is invalid!!</p>)
                                ))
                            )}
                        </div>
    </Box>
    </div>
  );
}