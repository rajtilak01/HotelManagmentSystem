const express = require("express");
const dbConnect = require("./db");

const app = express();

const roomsRoutes = require("./routes/roomroutes");
const port = process.env.PORT || 8000;

app.use("/api/rooms/",roomsRoutes);
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})

dbConnect();