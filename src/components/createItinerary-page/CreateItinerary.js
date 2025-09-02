import React, { useState, useEffect } from "react";
import TravelBg from '../../images/Travel_bg1.png';
import { Paper, Box, TextField, Stack, Button, InputLabel, MenuItem, Select, FormControl, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthLoading } from '../../authentication/useAuth'
import { toast } from "react-toastify";
import { differenceInDays } from 'date-fns';
export function CreateItinerary() {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [dates, setDates] = useState(["", ""]);
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const navigate = useNavigate();
    const loading = useAuthLoading();
    const user = useAuth();
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);
    if (loading) {
        return <p>loading....</p>;
    }
    const calculateDays = (start, end, days) => {
        const diffDays = differenceInDays(end, start) + 1;

        if (diffDays !== days) return false;

        return true;
    }
    const handleCreateItinerary = async (e) => {
        e.preventDefault();
        const daysNumber = parseInt(days, 10);
        if (daysNumber < 0 || daysNumber===0) {
            toast.error("Days can't be NEGATIVE/ZERO");
            return;
        }
      
        if (!calculateDays(dates[0], dates[1], daysNumber)) {
            toast.error("Duration and days must be equal");
            return;
        }
        const cost = parseInt(budget, 10);
        const size = parseInt(groupSize, 10);
        if (cost < 0) {
            toast.error("Budget can't be NEGATIVE");
            return;
        }
        if (size < 0) {
            toast.error("Group size can't be NEGATIVE");
            return;
        }

        const newItinerary = {
            userEmail: user?.email,
            destination,
            days,
            dates,
            description,
            budget,
            groupSize
        };
        try {
            await axios.post('http://localhost:5000/itineraries', newItinerary);
            setDestination("");
            setDays("");
            setDates(["", ""]);
            setDescription("");
            setBudget("");
            setGroupSize("");
            toast.success("Created successfully");
            navigate("/profile/createdTrips");


        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <div className="create-heading" style={{ fontSize: "40px", fontWeight: "bold" }}>Create new Itinerary</div>
            <Box display="flex" justifyContent="center" minHeight="90vh"
            >
                <Paper elevation={3} sx={{ border: 1, p: 4, width: 600, margin: "50px auto" }}>
                    <form onSubmit={handleCreateItinerary}>
                        <Stack spacing={2}>
                            {/* <TextField label="Destination" type="text" required value={destination} onChange={(e)=>{setDestination(e.target.value)}} />{"  "} */}

                            <FormControl >
                                <InputLabel id="destination-select">Destination</InputLabel>
                                <Select label="Destination" labelId="destination-select" value={destination} onChange={(e) => { setDestination(e.target.value) }}>
                                    <MenuItem value="hyderabad">Hyderabad</MenuItem>
                                    <MenuItem value="mumbai">Mumbai</MenuItem>
                                    <MenuItem value="delhi">Delhi</MenuItem>
                                    <MenuItem value="bangalore">Bangalore</MenuItem>
                                    <MenuItem value="Jaipur">Jaipur</MenuItem>
                                    <MenuItem value="Sikkim">Sikkim</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="Number of Days" type="number" required value={days} onChange={(e) => { setDays(e.target.value) }} />
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <p style={{textAlign:"left"}}>Start date</p>
                                <TextField  type="date" value={dates[0]} required onChange={(e) => { setDates([e.target.value, dates[1]]) }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <p style={{textAlign:"left"}}>End date</p>
                            </Box>
                            <TextField type="date" value={dates[1]} required onChange={(e) => { setDates([dates[0], e.target.value]) }} /><br />
                            <TextField multiline rows={4} required label="Enter Description (activites, stay, Tips)" type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            <TextField label="Budget per person(INR)" required type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
                            <TextField label="Group size" type="number" required value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
                            <Button type="submit" sx={{ backgroundColor: "green", color: "#ffffff" }}>Create</Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </div>
    )
}