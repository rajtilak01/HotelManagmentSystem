import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomeScreenI() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setfromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateroom, setduplicateroom] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("api/rooms/getallrooms")).data;
        setRooms(data); // Update state with response data
        setduplicateroom(data);
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
    setfromDate(dates[0].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    var temprooms = [];
    var availabililty = false;
    for (const room of duplicateroom) {
      // if(room.currentbookings.length == 0){
      //   temprooms.push(room);
      // }
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(
              moment(dates[0].format("DD-MM-YYYY")).isBetween(
                booking.firstdate,
                booking.lastdate
              )
            ) &&
            !moment(
              moment(dates[1].format("DD-MM-YYYY")).isBetween(
                booking.firstdate,
                booking.lastdate
              )
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.firstdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.lastdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.firstdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.lastdate
            ) {
              availabililty = true;
            }
          }
        }
      }
      if (availabililty || room.currentbookings.length == 0) {
        temprooms.push(room);
      }
      // setRooms(temprooms);
    }
  }

  // function filterByDate(dates) {
  //   // var dateRange = RangePicker.getMoment("2018-9-3
  //   // console.log(dates[0].format('DD-MM-YYYY'));
  //   // console.log(dates[1].format('DD-MM-YYYY'));
  
  //   const fromDateStr = dates[0]?.format("DD-MM-YYYY");
  //   const toDateStr = dates[1]?.format("DD-MM-YYYY");
  
  //   if (!fromDateStr || !toDateStr) {
  //     // Dates are not valid, handle the error or return early
  //     console.error("Invalid dates");
  //     return;
  //   }
  
  //   setfromDate(fromDateStr);
  //   setToDate(toDateStr);
  
  //   var temprooms = [];
  //   for (const room of duplicateroom) {
  //     var availabililty = false;
  
  //     if (room.currentbookings.length > 0) {
  //       for (const booking of room.currentbookings) {
  //         if (
  //           !moment(
  //             moment(fromDateStr).isBetween(
  //               booking.firstdate,
  //               booking.lastdate
  //             )
  //           ) &&
  //           !moment(
  //             moment(toDateStr).isBetween(
  //               booking.firstdate,
  //               booking.lastdate
  //             )
  //           )
  //         ) {
  //           if (
  //             moment(fromDateStr).format("DD-MM-YYYY") !== booking.firstdate &&
  //             moment(fromDateStr).format("DD-MM-YYYY") !== booking.lastdate &&
  //             moment(toDateStr).format("DD-MM-YYYY") !== booking.firstdate &&
  //             moment(toDateStr).format("DD-MM-YYYY") !== booking.lastdate
  //           ) {
  //             availabililty = true;
  //           }
  //         }
  //       }
  //     }
  
  //     if (availabililty || room.currentbookings.length === 0) {
  //       temprooms.push(room);
  //     }
  //   }
  
  //   // Update state with filtered rooms
  //   // setRooms(temprooms);
  // }
  
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Search Rooms"/>
        </div>

        <select>
          <option value='all'>All</option>
          <option value='Delux'>Delux</option>
          <option value='Non-Delux'>Non-Delux</option>
        </select>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading />
        ) : rooms.length >= 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default HomeScreenI;
