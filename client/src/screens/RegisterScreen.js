import React, { useState, useEffect } from "react";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  function register(){
    if(password==cpassword){
        const user={
            name,
            email,
            password,
            cpassword
        }
        console.log(user);
    }
    else{
        alert("Password not matching");
    }
  }
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
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
