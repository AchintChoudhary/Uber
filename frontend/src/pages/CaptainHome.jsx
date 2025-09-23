import React, { useRef, useState,useEffect,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react"; //for animation
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import {SocketContext} from '../context/SocketContext'
import { CaptainDataContext } from "../context/CaptainContext";
import { set } from "mongoose";
const CaptainHome = () => {

const [ridePopUp, setRidePopUp] = useState(false)
const [confirmRidePopUp,setConfirmRidePopUp]=useState(false)
const [ride,setRide]=useState(null)

const ridePopUpRef = useRef(null)
const confirmRidePopUpRef = useRef(null)


const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
     
        socket.emit("join", { userType: "captain", userId: captain._id })

 const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)

    })

 socket.on('new-ride', (data) => {
console.log('New ride received:', data);
     setRide(data) 
setRidePopUp(true)
    })


const confirmRide=async()=>{
await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
  rideId:ride._id,
  captainId:captain._id
},{ headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }})

}


  useGSAP(() => {
    if (ridePopUp) {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUp]);

 useGSAP(() => {
    if (confirmRidePopUp) {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUp]);



  return (
    <div className="h-screen">
      <div className="fixed flex items-center justify-between p-3 w-screen">
        <img
          className=" w-16 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <Link className=" top-2 right-2  bg-white flex items-center   w-10 h-10 justify-center rounded-full">
          <i className=" text-lg font-bold ri-logout-box-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-2/5 p-3">
       <CaptainDetails/>
      </div>


 <div  ref={ridePopUpRef} className="fixed translate-y-full  w-full z-10 bottom-0 bg-white px-3 py-6 ">
       <RidePopUp setRidePopUp={setRidePopUp} ride={ride}
        
        confirmRide={confirmRide}
        setConfirmRidePopUp={setConfirmRidePopUp} />
      </div>

       <div  ref={confirmRidePopUpRef} className="fixed translate-y-full h-screen w-full z-10 bottom-0 bg-white px-3 py-6 ">
       <ConfirmRidePopUp 
       ride={ride}
       setConfirmRidePopUp={setConfirmRidePopUp}  setRidePopUp={setRidePopUp} />
      </div>





    </div>
  )
};

export default CaptainHome;
