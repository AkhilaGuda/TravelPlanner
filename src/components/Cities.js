import { Box, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import TravelBg from '../images/Travel_bg1.png';
import { useParams,useNavigate } from "react-router-dom";
export default function Cities() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate =useNavigate();
    useEffect(() => {
        fetch("http://localhost:5000/cities")
            .then((res) => {
                if (!res.ok) {
                    throw new error("failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setCities(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error)
                console.error(error.message);
            });
    }, []);
    const handleCityClick =(city)=>{
        const cityName=city.toLowerCase();
        console.log(cityName);
        navigate(`/itineraries/${cityName}`);
    }
    if (loading) return <h3>Loading cities...</h3>
    if (error) return <h3>Error : {error}</h3>
    return (
        <div >

            <h1>CITIES</h1>

            <div className="cities" style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", padding: "50px" }}>
                {cities.map((city,idx) => (
                    <div className="city-card" key={idx} onClick={()=>handleCityClick(city.cityName)}
                    style={{ backgroundColor: "#b2ca98ff", borderRadius: "5px", boxShadow: "1 10px 8px rgba(0,0,0,0.15)" }} >
                        <h2>{city.cityName}</h2>
                        <img src={city.image} alt="city-image" style={{ height: "400px", width: "300px" }} />
                    </div>
                ))}
            </div>
            
        </div>

    );
}