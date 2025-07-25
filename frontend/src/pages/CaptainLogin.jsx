import React, { useState }from 'react'
import {Link} from 'react-router-dom'
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email,
        password: password,
      });
      console.log(captainData);
  
      setEmail("");
      setPassword("");
    };
  return  (
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
          Join a fleet?{" "}
          <Link className="text-[#0866ff]" to="/captain-signup">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link to='/login' className=" bg-[#d5622d] flex items-center justify-center text-white font-semibold px-4  py-2 rounded w-full text-lg placeholder:text-base mb-5">
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin