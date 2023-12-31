import React, {useEffect, useState} from 'react'
import { createRoutesFromElements, useParams } from 'react-router-dom';
import axios from 'axios';

function BookingScreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  

  useEffect(() => {
    const fetchDatabyId = async () => {
      try {
        // setLoading(true);
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
      <div className='m-5'>
      {loading ? (<h1>loading.....</h1>) : error ?  (<h1>error....</h1>) : (<div>
        <div className='row mt-5 justify-content-center bs'>
          <div className='col-md-6'>
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className='bigimg'/>
          </div>
          <div className='col-md-6'>
            <div style={{textAlign:'right'}}>
            <h1>Booking Detials</h1>
            <br/>
            <b>
              <p>Name : </p>
              <p>From Date : </p>
              <p>To Date : </p>
              <p>Max Count : {room.maxcount}</p>
            </b>
            </div>
            <div style={{textAlign:'right'}}>
              <b>
              <h1>Amount</h1>
              <br/>
              <p>Total Days</p> 
              <p>Rent per day : {room.rentperday}</p> 
              <p>Total Ammount</p>  
              </b>
            </div>
            <div style={{float:'right'}}>
              <button className='btn btn-primary'>Pay Now</button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}
export default BookingScreen