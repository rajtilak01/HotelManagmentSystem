import React, { useState, useEffect } from "react";
import Error from '../components/Error';
import Loading from '../components/Loading';
import axios from 'axios';
import Success from "../components/Success";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [success, setSuccess] = useState('');

  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  async function register(){
    if(password==cpassword){
        const user={
            name,
            email,
            password,
            cpassword
        }
        try {
          setloading(true);
          const result = (await axios.post('/api/users/register',user)).data;
          setloading(false);
          setSuccess(true);
          
          window.location.href='/login'
          setName('');
          setemail('');
          setPassword('');
          setcpassword('');
        } catch (error) {
          setloading(false);
          setError(true);   
          console.log(error);
        }
    }
    else{
        alert("Password not matching");
    }
  }
  return (
    <div>
      { loading && (<Loading/>)}
      {error && (<Error/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
            {success && (<Success message="Registered successfully"/>)}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
