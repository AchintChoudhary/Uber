import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const[firstName,setFirstName]=useState("")
const [userData,setUserData]=useState({})
const submitHandler=(e)=>{

  e.preventDefault()
setUserData({
  email:email,
  firstName:firstName,
  lastName:lastName,
  password:password
})
console.log(userData)


setFirstName('')
setLastName('')
setPassword('')
setEmail('')
}

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        ></img>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-base font-medium mb-2">What's your name ?</h3>
          <div className="flex gap-2 mb-6">
            <input value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
              required
              className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded text-lg placeholder:text-base "
              type="text"
              placeholder="First name"
            ></input>
            <input value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
              required
              className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded  text-lg placeholder:text-base "
              type="text"
              placeholder="Last name"
            ></input>
          </div>

          <h3 className="text-base font-medium mb-2">What's your email ?</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className=" bg-[#eeeeee]  px-4  py-2 rounded w-full text-lg placeholder:text-base mb-6"
            type="email"
            placeholder="@example.com"
          ></input>
          <h3 className="text-base font-medium mb-2">Enter password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee]  px-4  py-2 rounded w-full text-base placeholder:text-sm mb-6"
            required
            type="password"
            placeholder="password"
          />
          <button className=" bg-[#111] text-white font-semibold px-4  py-2 rounded w-full text-base placeholder:text-sm mb-3">
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have a Account?{" "}
          <Link className="text-[#0866ff]" to="/login">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] text-[#666666] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google and Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
