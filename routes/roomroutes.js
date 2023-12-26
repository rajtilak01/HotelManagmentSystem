const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async(req,res) => {
    try{
        const rooms = await Room.find({});
        res.status(200).send(rooms); 
    }
    catch (err){
        res.status(400).json("Error in fetcing room details");
    }
})

module.exports = router;