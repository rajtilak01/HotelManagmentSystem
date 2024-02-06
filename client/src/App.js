import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreenI from './screens/HomeScreenI'
import BookingScreen from './screens/BookingScreen';
import LoginScreens from './screens/LoginScreens';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/home" exact Component={HomeScreenI}/>
        <Route path="/book/:roomid/:fromDate/:toDate" exact Component={BookingScreen}/>
        <Route path="/register" exact Component={RegisterScreen}/>
        <Route path="/login" exact Component={LoginScreens}/>
        <Route path='/profile' exact Component={ProfileScreen}/>        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
