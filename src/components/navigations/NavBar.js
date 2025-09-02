import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton,Tooltip } from "@mui/material";
import { useAuth,useAuthLoading } from "../../authentication/useAuth";
import { auth } from '../../authentication/firebase';
import { toast } from "react-toastify";
import { ThemeContext } from "./ThemeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HolidayVillageSharpIcon from '@mui/icons-material/HolidayVillageSharp';
const NavBar = () => {
    const user = useAuth();
    const loading=useAuthLoading();
    const {theme,toggleTheme}=useContext(ThemeContext);

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
    },[theme]);

    const handleLogout = () => {
        auth.signOut();
    };
    if(loading){
        return(
            <AppBar position="sticky" color="success">
            <Toolbar>
                <Typography>Loading...</Typography>
            </Toolbar>
        </AppBar>
        );
    }
    
    

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#b2ca98ff" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "black" }}>
                <Button color="inherit" component={Link} to="/"><HolidayVillageSharpIcon sx={{color:"black"}}/></Button>
                <Button color="inherit" component={Link} to="/cities">Cities</Button>
                <Button color="inherit" component={Link} to="/itineraries">Itineraries</Button>
                

                {/* Only show if user is logged in */}
                {user && (
                    <>
                        <Button color="inherit" component={Link} to="/createItinerary">Create Itinerary</Button>
                        <Tooltip title="Profile" sx={{color:"black"}} >
                            <IconButton component={Link} to="/profile" ><AccountCircleIcon ></AccountCircleIcon></IconButton>
                        </Tooltip>
                    </>
                )}

                {/* Auth action */}
                {user ? (
                    <Tooltip title="Logout" sx={{color:"black"}}>
                        <IconButton component={Link} onClick={handleLogout}><LogoutIcon /></IconButton>
                    </Tooltip>
                ) : (
                    <Button color="inherit" component={Link} to="/login">Login / Signup</Button>
                )}
                <Button onClick={toggleTheme}>{theme==='light' ? <DarkModeIcon sx={{color:'black' }}/>:<LightModeIcon sx={{color:'orange' }}/>}</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
