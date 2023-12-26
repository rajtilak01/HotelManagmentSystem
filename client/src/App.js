import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from './screens/homeScreen'
import HomeScreenI from './screens/HomeScreenI'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/home" exact Component={HomeScreenI}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
