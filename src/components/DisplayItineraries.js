import { TextField, Button, Card, Box, Paper, Stack, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem, 
  Tooltip,
  IconButton} from "@mui/material";
import TravelBg from '../images/Travel_bg1.png';
import React, { useEffect, useOptimistic, useState } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import axios from "axios";
import GroupIcon from '@mui/icons-material/Groups3';
import AddTaskIcon from '@mui/icons-material/AddTask';


export default function DisplayItineraries({ itineraries }) {
    const navigate = useNavigate();

    // Format: [{ userEmail: "akhila@gmail.com", itineraryId: "1",item }, {}]
    const [joinedList, setJoinedList] = useState([]);
    const [joinedTripsIds, setJoinedTripsIds] = useState([]);
    const [joinedPeople, setJoinedPeople] = useState([]);
    const[selectedItemId,setSelectedItemId]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    let newEntry = [];
    // console.log(joinedList);

    const user = useAuth();

    useEffect(() => {
        if (user) {
            const userEmail = user.email;
            axios.get(`http://localhost:5000/user?userEmail=${userEmail}`)
                .then((response) => {
                    const tripIds = response.data.map(entry => entry.itineraryId);
                    setJoinedTripsIds(tripIds);
                })
                .catch(error => console.error(error.message));
        }
    }, [user]);
    const handleJoin = async (item) => {
        if (user === null) {
            navigate("/login");
            return;
        }
        else {
            const itineraryId = item.id;
            const userEmail = item.email;
            const alreadyJoined = joinedTripsIds.includes(item.id);
            if (!alreadyJoined) {
                newEntry = { userEmail: userEmail, itineraryId: itineraryId, item };
                await axios.post(`http://localhost:5000/user`, newEntry);
                setJoinedList(prev => [...prev, newEntry]);
                setJoinedTripsIds(prev => [...prev, itineraryId]);
                navigate('/profile/joinedTrips');

            }
            else {
                console.log("user already joined");
                navigate('/profile/joinedTrips');
            }
        }
    }
    const viewParticipants = async (itemId) => {
        try {
            const response = await axios.get(`http://localhost:5000/user?itineraryId=${itemId}`);
            const userNames = response.data.map((entry) => entry.userEmail.split('@')[0]);
            setJoinedPeople(userNames);
            setSelectedItemId(itemId);
            setOpenDialog(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Box>
                <h2>AVAILABLE ITINERARIES LIST</h2>
                <div style={{
                    display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px",

                }}>
                    {itineraries.length === 0 ? (<p>Itineraries are empty</p>) : (
                        itineraries.map((item, idx) => (
                            <Card key={idx} sx={{ p: 2, height: "40vh", width: "30vw", backgroundColor: "#b2ca98ff" }}>
                                <Typography><strong>Destination: {item.destination}</strong></Typography>
                                <Typography>Days: {item.days}</Typography>
                                <Typography>Start Date: {item.dates[0]}</Typography>
                                <Typography>End Date: {item.dates[1]}</Typography>
                                <Typography>Description: {item.description}</Typography>
                                <Typography>Budget per person: ₹{item.budget}</Typography>
                                <Typography>Group Size: {item.groupSize}</Typography>
                                {/* {console.log(item)} */}
                                <Tooltip title="Join Itinerary">
                                <Button variant="contained" onClick={() => handleJoin(item)}
                                    color={joinedTripsIds.includes(item.id) ? "success" : "primary"}
                                    disabled={joinedTripsIds.includes(item.id)}>
                                    {joinedTripsIds.includes(item.id) ? "Joined" : <AddTaskIcon />}
                                </Button>
                                </Tooltip>
                                
                               
                                <Tooltip title="View participants" sx={{color:"black"}}>
                                    <IconButton onClick={()=>{viewParticipants(item.id)}}><GroupIcon fontSize="large"/></IconButton>

                                </Tooltip>

                            </Card>
                        ))
                    )}
                    <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
                                    <DialogTitle>Participants</DialogTitle>
                                    <DialogContent>
                                        {joinedPeople.length>0 ? (
                                            <List>
                                                {joinedPeople.map((name,index)=>(
                                                    <ListItem key={index}>
                                                        <Typography>{name}</Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ):<Typography>You are the first one to join!!</Typography>}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={()=>setOpenDialog(false)} color="primary">X</Button>
                                    </DialogActions>
                                </Dialog>
                </div>

            </Box>
        </div>
    );
}