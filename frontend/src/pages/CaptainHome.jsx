import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react"; //for animation
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {

const [ridePopUp, setRidePopUp] = useState(true)
const [confirmRidePopUp,setConfirmRidePopUp]=useState(false)

const ridePopUpRef = useRef(null)
const confirmRidePopUpRef = useRef(null)

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
       <RidePopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} />
      </div>

       <div  ref={confirmRidePopUpRef} className="fixed translate-y-full h-screen w-full z-10 bottom-0 bg-white px-3 py-6 ">
       <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp}  setRidePopUp={setRidePopUp} />
      </div>





    </div>
  )
};

export default CaptainHome;
