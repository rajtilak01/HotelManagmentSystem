const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const roomModel = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/bookroom", async (req, res) => {
  const { room, user_id, firstdate, lastdate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "INR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
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
            $push: {
              currentbookings: {
                bookingid: booking._id,
                firstdate: moment(firstdate).format("DD-MM-YYYY"),
                lastdate: moment(lastdate).format("DD-MM-YYYY"),
                user_id,
                status: booking.status,
              },
            },
          }
        );
        res.send("Room booked successfully");
      } catch (error) {
        return res.status(400).json({ error });
      }
    }

    res.send("Payment Successful");
  } catch (error) {
    return res.status(400).json({ error: "Error creating payment", details: error.message });
}

});

module.exports = router;
