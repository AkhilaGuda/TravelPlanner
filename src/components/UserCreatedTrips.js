import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../authentication/useAuth";
import { Typography, Card, Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserCreatedTrips() {
    const [createdTrips, setCreatedTrips] = useState([]);
    const user = useAuth();
    const handleDelete = async (trip) => {
        try {
            await axios.delete(`http://localhost:5000/itineraries/${trip.id}`);
            toast.success(" Successfully deleted itinerary.");
            fetchCreatedTrips();
        }
        catch (error) {
            console.log(error);
            toast.error("Try again");
        }

    }
    const fetchCreatedTrips = async () => {
        try {
            const response = await axios.get('http://localhost:5000/itineraries');
            const userCreated = response.data.filter(
                itinerary => itinerary.userEmail === user?.email
            );
            setCreatedTrips(userCreated);
        } catch (error) {
            toast.error("Error fetching created trips.");
            console.error("Error fetching created trips:", error);
        }
    };
    useEffect(() => {
        fetchCreatedTrips();
    }, [user]);

    if (!user) return <p>Please log in to view your created trips.</p>;

    return (
        <Box sx={{
               
                py: 5,
                px: 2}}>
            {createdTrips.length!==0 && <h2>Created Itineraries</h2>}



            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
            }}>
                {createdTrips.length === 0 ? (
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                        No trips created yet.
                    </Typography>) : (
                    createdTrips.map((trip, idx) => (
                        <Card key={idx} sx={{p: 3,
                            width: 450,
                            backgroundColor: "#f0f0f0",
                            boxShadow: 3}}>
                            <Typography><strong>Destination:</strong> {trip.destination}</Typography>
                            <Typography><strong>Dates:</strong> {trip.dates[0]} to {trip.dates[1]}</Typography>
                            <Typography><strong>Description:</strong> {trip.description}</Typography>
                            <Typography><strong>Budget:</strong> ₹{trip.budget}</Typography>
                            <Typography><strong>Group Size:</strong> {trip.groupSize}</Typography>
                            <Button type="submit" onClick={() => { handleDelete(trip) }} color="error" ><DeleteIcon sx={{color:"red"}}/></Button>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
}
