import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/Loading";
import Error from "../components/Error";
const { TabPane } = Tabs;

const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>

          <br />

          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await axios.post("api/bookings/getbookingsbyuserid", {
          userid: user._id,
        }).data;
        // Update the bookings state with the fetched data
        setBookings(data);
        console.log("rooms", data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    // Call the fetchBookings function when the component mounts
    fetchBookings();

    // Specify any dependencies for useEffect to avoid unnecessary re-renders
  }, [user._id]);

  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.room}</h1>
                <h1>BookingId: {booking._id}</h1>
                <h1>CheckIn: {booking.firstdate}</h1>
                <h1>CheckOut: {booking.lastdate}</h1>
                <h1>Price per night: {booking.totalAmount}/Night</h1>
                <h1>Status: {booking.status == 'booked' ? 'CONFIRMED' : 'CANCELLED'}</h1>

                <div className="text-right">
                    <button className="btn btn-primary">CANCEL BOOKING</button>
                </div>
              </div>
              
            );
          })}
      </div>
    </div>
  );
}
