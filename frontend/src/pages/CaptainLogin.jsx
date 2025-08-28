import React, { useState,useContext }from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainLogin = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  const navigate=useNavigate()
const {captain,setCaptain}=useContext(CaptainDataContext)


    const submitHandler = async(e) => {
      e.preventDefault();
      const captain={
        email: email,
        password: password,
      };
     
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

if (response.status==200) {
      const data = response.data;  //data is object  {token,user}
     
     setCaptain(data.user);   //Take out user from object
  localStorage.setItem('token',data.token)
     navigate("/captain-home"); 
    }



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