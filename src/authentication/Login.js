// move Login and Signup to components folder

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Paper, Stack, CircularProgress } from "@mui/material";
import TravelBg from '../images/Travel_bg1.png';
import { toast } from "react-toastify";
import { useAuthLoading } from "./useAuth";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loading = useAuthLoading();
    const navigate = useNavigate();
    const [loginloading, setLoginloading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        
        setLoginloading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            toast.success("logged in successfully");
            navigate("/", { replace: true }); // replace true - users cannot go back to login 
        } catch (error) {
            console.error(error.message);
            toast.error("Login failed. Please check credentials.");
        }finally{
            setLoginloading(false);
        }
    }
    return (
        <Box display="flex" justifyContent="center" paddingTop="50px" minHeight="90vh" 
            >
            <Paper elevation={3} sx={{ border: 1, p: 4, width: 400, margin: "50px auto" }}>
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <Stack spacing={2}>
                        <TextField label="Email" fullWidth required type="email" onChange={(e) => setEmail(e.target.value)} />

                        <TextField label="Password" type="password" fullWidth required onChange={(e) => setPassword(e.target.value)} />

                        <Button type="submit" disabled={loginloading} sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}>{ loginloading ? <CircularProgress size={24} /> :"Login"}</Button>
                    </Stack>
                    <p>Don't have an account? {" "} <Link to="/signup">Signup</Link></p>
                </form>
            </Paper>

        </Box>
    )
}