import './App.css';
import { AuthProvider, useAuth } from './authentication/useAuth';
import Login from './components/Login';
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Cities from './components/Cities';
import { CreateItinerary } from './components/CreateItinerary';
import ItineraryList from './components/ItineraryList';
import NavBar from './components/NavBar';
import CityItineraries from './components/CityItineraries';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import UserJoinedTrips from './components/UserJoinedTrips';
import UserCreatedTrips from './components/UserCreatedTrips';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  const user = useAuth();
  return (
    <ThemeProvider>
    <AuthProvider>
    <div className='app'>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cities" element={<Cities />} />
          {/* ProtectedRoutes */}
          <Route path="/createItinerary" element={<ProtectedRoute><CreateItinerary /></ProtectedRoute>} />
          <Route path="/itineraries"  element={<ItineraryList />} />
          <Route path="/itineraries/:city" element={<CityItineraries />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} >
          <Route path="joinedTrips" element={<UserJoinedTrips />}/>
          <Route path="createdTrips" element={<UserCreatedTrips />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
          
          
        </Routes>
      </Router>

      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} closeOnClick  />
    </div>
    </AuthProvider>

    </ThemeProvider>
  );
}

export default App;
