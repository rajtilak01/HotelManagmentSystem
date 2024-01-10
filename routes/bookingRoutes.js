const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const roomModel = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room, user_id, firstdate, lastdate, totalAmount, totalDays } =
    req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: user_id,
      firstdate: moment(firstdate).format("DD-MM-YYYY"),
      lastdate: moment(lastdate).format("DD-MM-YYYY"),
      totalAmount,
      totalDays,
      transactionId: "1234",
    });

    const booking = await newbooking.save();

    await roomModel.updateOne(
        { _id: room._id },
        {
          $addToSet: {
            currentbookings: {
              $each: [
                {
                  bookingid: booking._id,
                  firstdate: moment(firstdate).format("DD-MM-YYYY"),
                  lastdate: moment(lastdate).format("DD-MM-YYYY"),
                  user_id,
                  status: booking.status,
                },
              ],
            },
          },
        }
      );
    res.send("Room booked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
