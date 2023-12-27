import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreenI() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, serError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('api/rooms/getallrooms');
        setRooms(response.data); // Update state with response data
      } catch (error) {
        console.log("Error in fetching details from backend", error);
      }
    };

    fetchData(); // Call the inner asynchronous function
  }, []);

  return (
    <div>
      <h1>Home Screen Luvuuuu</h1>
      <h1>There are {rooms.length} rooms</h1>
    </div>
  );
}

export default HomeScreenI;
