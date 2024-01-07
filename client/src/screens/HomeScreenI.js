import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";
import 'antd/dist/reset.css'
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;


function HomeScreenI() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setfromDate] = useState();
  const [toDate, setToDate] = useState();

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

  function filterByDate(dates) {
    // var dateRange = RangePicker.getMoment("2018-9-3
    // console.log(dates[0].format('DD-MM-YYYY'));
    // console.log(dates[1].format('DD-MM-YYYY'));
    setfromDate(dates[0].format('DD-MM-YYYY'));
    setToDate(dates[1].format('DD-MM-YYYY'));
  }
  return (
    <div className="container">

      <div className='row mt-5'>
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading/>
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room={room} fromDate={fromDate} toDate={toDate}/>
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
