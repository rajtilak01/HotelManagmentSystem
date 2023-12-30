import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
// import HomeScreen from './screens/homeScreen'
import HomeScreenI from './screens/HomeScreenI'
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/home" exact Component={HomeScreenI}/>
        <Route path="/book/:roomid/" exact Component={BookingScreen}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
