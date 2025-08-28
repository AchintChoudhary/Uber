import React,{useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const[firstName,setFirstName]=useState("")



 const[vehicleColor,setVehicleColor]=useState("")
  const[vehiclePlate,setVehiclePlate]=useState("")
 const[vehicleType,setVehicleType]=useState("")
  const[vehicleCapacity,setVehicleCapacity]=useState("")

  const { captain, setCaptain } = useContext(CaptainDataContext);

const navigate=useNavigate()


const submitHandler= async(e)=>{

  e.preventDefault()
const CaptainData={
  fullname:{
 firstname:firstName,
  lastname:lastName 
  },
  email:email,
 
  password:password,
  vehicle:{
    color:vehicleColor,
    plate:vehiclePlate,
    capacity:vehicleCapacity,
  vehicleType:vehicleType
  }
}

const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      CaptainData
    );

  if (response.status == 201) {
      const data = response.data;
      setCaptain(data.user);           // Updates global user state
       localStorage.setItem('token',data.token)
      navigate("/captain-home");
    }





setFirstName('')
setLastName('')
setPassword('')
setEmail('')
setVehicleColor('')
setVehiclePlate('')
setVehicleType('')
setVehicleCapacity('')



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
 <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
<div className="flex gap-2 mb-6">
               <input value={vehicleColor}
               onChange={(e)=>{
                 setVehicleColor(e.target.value)
               }}
                 required
                 className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded text-lg placeholder:text-base "
                 type="text"
                 placeholder="Vehicle color"
               ></input>
               <input value={vehiclePlate}
               onChange={(e)=>{
                 setVehiclePlate(e.target.value)
               }}
                 required
                 className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded  text-lg placeholder:text-base "
                 type="text"
                 placeholder="Vehicle plate"
               ></input>
             </div>
   
   <div className="flex gap-2 mb-6">
               <input value={vehicleCapacity}
               onChange={(e)=>{
                 setVehicleCapacity(e.target.value)
               }}
                 required
                 className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded text-lg placeholder:text-base "
                 type="number"
                 placeholder="Capacity"
               ></input>
               <select value={vehicleType}
               onChange={(e)=>{
                 setVehicleType(e.target.value)
               }}
                 required
                 className=" bg-[#eeeeee] w-1/2  px-4  py-2 rounded  text-lg placeholder:text-base "
                >

<option value='' className='text-sm' disabled >Vehicle Type
</option>
<option value='car' className='text-sm'>Car</option>
<option value='auto' className='text-sm'>Auto</option>
<option value='motorcycle' className='text-sm'>Moto</option>

               </select>
             </div>
   


             <button className=" bg-[#111] text-white font-semibold px-4  py-2 rounded w-full text-base placeholder:text-sm mb-3">
               Signup
             </button>
           </form>
           <p className="text-center">
             Already have a Account?{" "}
             <Link className="text-[#0866ff]" to="/captain-login">
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
  )
}

export default CaptainSignup