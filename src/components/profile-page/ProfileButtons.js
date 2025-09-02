import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Paper, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import TravelBg from '../../images/Travel_bg1.png';
export default function ProfileButtons(){
    return(
        <Box 
            style={{        position: "relative", minHeight: "80vh", p: 4,
                             flexWrap: "wrap", justifyContent: "center", gap: "30px",
                            
                        }}>

            <Paper
                elevation={1}
                sx={{
                    maxWidth: 400,
                    mx: "auto",
                    p: 4,
                    backgroundColor:"transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                }}
            >
                <Stack spacing={2}>
                    <Button variant="outlined" color="primary" component={Link} to="/profile/joinedTrips" >
                        List Joined Itineraries
                    </Button>
                    <Button variant="outlined" color="primary" component={Link} to="/profile/createdTrips">
                        List created Itineraries
                    </Button>
                </Stack>
            </Paper>

            
        </Box>
    )
}