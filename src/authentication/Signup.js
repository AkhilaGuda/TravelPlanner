import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Paper, Stack, CircularProgress } from "@mui/material";
import TravelBg from '../images/Travel_bg1.png';
import { toast } from "react-toastify";
export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const navigate = useNavigate();
    const isStrongPassword = (password) => {
        return (
            password.length >= 8 &&                        // At least 8 characters
            /[A-Z]/.test(password) &&                      // At least one uppercase letter
            /[a-z]/.test(password) &&                      // At least one lowercase letter
            /[0-9]/.test(password) &&                      // At least one digit
            /[^A-Za-z0-9]/.test(password)                 // At least one special character
            
        );
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if(!isStrongPassword(password)){
            toast.error("Please enter Strong Password(include 8characters, uppercase, lowercase, digit, special character)");
            return;
        }
        if(password!==confirmPassword){
            toast.error("password and confirm password need to be same ");
            return;
        }
        
        setSignupLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            const user = auth.currentUser;
            console.log(user);
            toast.success(`user ${name} registered successfully`);
            navigate("/", { replace: true });
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error(error.message);
            toast.error("Email already in use");
        }finally{
            setSignupLoading(false);
        }
    }

    return (
        <Box display="flex" justifyContent="center" minHeight="9    0vh"
            >
            <Paper elevation={3} sx={{ border: 1, p: 4, width: 400, margin: "50px auto" }}>
                <form onSubmit={handleSignup}>
                    <h2>Signup</h2>
                    <Stack spacing={2}>
                        <TextField label="Name" type="name" fullWidth required margin="normal" onChange={(e) => setName(e.target.value)} />
                        <br />
                        <TextField label="Email" type="email" fullWidth required margin="normal" onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <TextField label="Password" type="password" fullWidth required margin="normal" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <TextField label="Confirm password" type="password" fullWidth required margin="normal" onChange={(e) => setConfirmPassword(e.target.value)} />

                        <Button type="submit" disabled={signupLoading} sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}>{ signupLoading ? <CircularProgress size={24} /> :"Signup"}</Button>
                    </Stack>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </Paper>
        </Box>
    )
}