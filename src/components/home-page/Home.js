import React from "react";
import { Button, Paper, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home() {
// remove unused imports and variable also format the file
// Avoid inline styling wherever possible,instead use CSS files across the project
    const navigate = useNavigate();
    return (
        <Box sx={{ position: "relative", minHeight: "80vh", p: 4,}}>

            <Paper
                elevation={1}
                sx={{
                    maxWidth: 400,
                    mx: "auto",
                    p: 4,
                    backgroundColor:"transparent" ,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                }}
            >
                <Stack spacing={2}>
                    <Button variant="outlined" color="info" component={Link} to="/itineraries">
                        List Available Itineraries
                    </Button>
                    <Button variant="outlined" color="info" component={Link} to="/createItinerary">
                        Create Your Own Trip
                    </Button>
                </Stack>
            </Paper>

            {/* Bottom-Right Image */}
            {/* remove the unwanted comments */}
            <Box
                component="img"
                src="/travel-concept2.png"
                alt="Background"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60vw",
                    height: "auto",
                    zIndex: 1,
                }}
            />
        </Box>
    );
}
