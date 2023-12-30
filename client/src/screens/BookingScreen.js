import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookingScreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  

  useEffect(() => {
    const fetchDatabyId = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid",{roomid})).data;
        setRoom(data); // Update state with response data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Error in fetching details from backend", error);
      }
    };

    fetchDatabyId(); // Call the inner asynchronous function
  }, []);
   
  return (
      <div>
      <h1>Booking screen</h1>
      <h1>Room id = {roomid}</h1>
    </div>
  );
}

export default BookingScreen