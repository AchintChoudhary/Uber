import React, { useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    console.log(userData);

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        ></img>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email ?</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className=" bg-[#eeeeee]  px-4  py-2 rounded w-full text-lg placeholder:text-base mb-7"
            type="email"
            placeholder="@example.com"
          ></input>
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee]  px-4  py-2 rounded w-full text-lg placeholder:text-base mb-7"
            required
            type="password"
            placeholder="password"
          />
          <button className=" bg-[#111] text-white font-semibold px-4  py-2 rounded w-full text-lg placeholder:text-base mb-3">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-[#0866ff]" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
      <div>
        <Link to='/captain-login' className=" bg-[#10b461] flex items-center justify-center text-white font-semibold px-4  py-2 rounded w-full text-lg placeholder:text-base mb-5">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
