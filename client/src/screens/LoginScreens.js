import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function LoginScreens() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState('');
  const [error, seterror] = useState('');
  async function Login(){
        const user={
            email,
            password,
        }
        console.log(user);
        try {
        setloading(true);
        const result = (await axios.post('/api/users/login',user)).data;
        setloading(false);
        localStorage.setItem("currUser",JSON.stringify(result));
        window.location.href='/home';
      } catch (error) {
        setloading(false);
        seterror(true); 
        console.log(error);
      }
  }
  return (
    <div>
      {loading && (<Loading/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && (<Error message='Invalid Credentials'/>)}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
           

            <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LoginScreens
