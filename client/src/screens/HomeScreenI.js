import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";

function HomeScreenI() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("api/rooms/getallrooms")).data;
        setRooms(data); // Update state with response data
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log("Error in fetching details from backend", error);
        setLoading(false);
      }
    };

    fetchData(); // Call the inner asynchronous function
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading/>
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room={room}/>
            </div>
          })
        ) : (
         <Error/>
        )}
        ;
      </div>
    </div>
  );
}

export default HomeScreenI;
