import React, {useEffect, useState} from 'react'
import { createRoutesFromElements, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import Error from '../components/Error';
import moment from 'moment';

function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  
  const firstdate = moment(fromDate , 'DD-MM-YYYY')
  const lastdate = moment(toDate , 'DD-MM-YYYY')
  // const totalDays = moment.duration(toDate.diff(fromDate));;
  const totalDays = moment.duration(lastdate.diff(firstdate)).asDays()+1;
  const totalAmount = room ? totalDays * room.rentperday : 0;
  

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
      {loading ? (<Loading/>) : room ? (<div>
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
              <p>From Date : {firstdate.format('DD-MM-YYYY')}</p>
              <p>To Date : {lastdate.format('DD-MM-YYYY')}</p>
              <p>Max Count : {room.maxcount}</p>
            </b>
            </div>
            <div style={{textAlign:'right'}}>
              <b>
              <h1>Amount</h1>
              <br/>
              <p>Total Days : {totalDays}</p> 
              <p>Rent per day : {room.rentperday}</p> 
              <p>Total Ammount : {totalAmount}</p>  
              </b>
            </div>
            <div style={{float:'right'}}>
              <button className='btn btn-primary'>Pay Now</button>
            </div>
          </div>
        </div>
      </div>) : (<Error/>)}
    </div>
  );
}
export default BookingScreen