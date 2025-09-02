import './App.css';
import { AuthProvider, useAuth } from './authentication/useAuth';
import Login from './authentication/Login';
import Signup from './authentication/Signup'
//NavLink is unused
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Cities from './components/cities-page/Cities';
import { CreateItinerary } from './components/createItinerary-page/CreateItinerary';
import ItineraryList from './components/home-page/ItineraryList';
import NavBar from './components/navigations/NavBar';
import CityItineraries from './components/cities-page/CityItineraries';
import Home from './components/home-page/Home';
import Profile from './components/profile-page/Profile';
import ProtectedRoute from './components/navigations/ProtectedRoute';
import UserJoinedTrips from './components/profile-page/UserJoinedTrips';
import UserCreatedTrips from './components/profile-page/UserCreatedTrips';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/navigations/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/navigations/ThemeContext';

//format the file

function App() {
  //user is unused
  const user = useAuth();
  return (
    <ThemeProvider>
      {/* Why we need AuthProvider here?we have it in index? which is better place to keep it */}
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
          {/* Lets also add protection for chids for syntactic explanation */}
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
