const express = require("express");
const dbConnect = require("./db");

const app = express();

const roomsRoutes = require("./routes/roomroutes");
const userRoutes = require("./routes/usersRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/rooms/",roomsRoutes);
app.use("/api/users/",userRoutes);
app.use('/api/bookings',bookingRoutes);


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})

dbConnect();