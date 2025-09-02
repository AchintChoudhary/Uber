import React from "react";
import CaptainRiding from "../pages/CaptainRiding";
import { Link } from "react-router-dom";
const ConfirmRidePopUp = (props) => {

const submitHandler=(e)=>{
e.preventDefault()
}




  return (
    <div>
      <h5 className=" w-[93%] text-center top-0 absolute  ">
        <i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i>
      </h5>
      <h1 className="font-semibold text-2xl mb-5">
        Confirm thise Ride to start
      </h1>
      <div>
        <div className="flex items-center space-x-4 justify-between bg-amber-400 p-2 rounded-xl">
          <div className="flex items-center space-x-4 justify-start">
            <img
              src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
              alt="Driver"
              className="w-18 h-18 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">SANTH</h2>
              <p className="text-gray-800 font-bold text-lg">KA15AK00-0</p>
            </div>
          </div>{" "}
          <div>
            <h1 className="text-sm font-bold">2.8 Km</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className="  text-xl ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600">Kothi Kacheri, Mandvi</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className=" text-xl ri-square-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600">Kothi Kacheri, Mandvi</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2  my-1 border-gray-200  ">
            <i className="  text-xl  ri-bank-card-2-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">₹ 193.30</h3>
              <p className=" text-sm  text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
         <form onSubmit={(e)=>{
submitHandler(e)
         }}>
           <input type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
           <Link
            onClick={() => {}}
            to="/captain-riding"
            className=" block text-center w-full mt-3 cursor-pointer bg-green-400 text-white font-semibold p-2 rounded-xl"
          >
            Confirm
          </Link>

          <button
            onClick={() => {
              props.setConfirmRidePopUp(false);
              props.setRidePopUp(false);
            }}
            className="w-full mt-2 cursor-pointer bg-red-500 text-white font-semibold p-2 rounded-xl"
          >
            Cancel
          </button>
         </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
