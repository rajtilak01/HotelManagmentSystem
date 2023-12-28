import React from "react";

function Room({ room }) {
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg"/>
      </div>
      <div className="col-md-7">
        <b>
        <h1>{room.name}</h1>
        <p>MaxCount : {room.maxcount}</p>
        <p>Phone Number : {room.phonenumber}</p>
        <p>Type : {room.type}</p>
        </b>

        <div style={{float:'right'}}>
            <button className="btn-primary btn ">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default Room;
