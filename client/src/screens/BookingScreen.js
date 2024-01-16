import React, { useEffect, useState } from "react";
import { createRoutesFromElements, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

// require("dotenv").config();

function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const firstdate = moment(fromDate, "DD-MM-YYYY");
  const lastdate = moment(toDate, "DD-MM-YYYY");
  // const totalDays = moment.duration(toDate.diff(fromDate));;
  const totalDays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    const fetchDatabyId = async () => {
      try {
        // setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid }))
          .data;
        setRoom(data); // Update state with response data
        setTotalAmount(data.rentperday * totalDays);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Error in fetching details from backend", error);
      }
    };

    fetchDatabyId(); // Call the inner asynchronous function
  }, []);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      user_id: JSON.parse(localStorage.getItem("currUser")).id,
      firstdate,
      lastdate,
      totalAmount,
      totalDays,
      token
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {}
  }
  return (
    <div className="m-5">
      {loading ? (
        <Loading />
      ) : room ? (
        <div>
          <div className="row mt-5 justify-content-center bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Detials</h1>
                <br />
                <b>
                  <p>
                    Name : {JSON.parse(localStorage.getItem("currUser")).name}
                  </p>
                  <p>From Date : {firstdate.format("DD-MM-YYYY")}</p>
                  <p>To Date : {lastdate.format("DD-MM-YYYY")}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <br />
                  <p>Total Days : {totalDays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Ammount : {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  currency="INR"
                  amount={totalAmount * 100}
                  token={onToken}
                  stripeKey="process.env.STRIPE_KEY"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
export default BookingScreen;
