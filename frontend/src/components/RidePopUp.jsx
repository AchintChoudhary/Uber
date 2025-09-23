import React from "react";

const RidePopUp = (props) => {

const meter=props.ride?.distance

const km=meter/1000;

  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUp(false);
        }}
        className=" w-[93%] text-center top-0 absolute  "
      >
        <i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i>
      </h5>
      <h1 className="font-semibold text-2xl mb-5">New Ride Available!</h1>
      <div>
        <div className="flex items-center space-x-4 justify-between bg-amber-400 p-2 rounded-xl">
          <div className="flex items-center space-x-4 justify-start">
            <img
              src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
              alt="Driver"
              className="w-18 h-18 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold capitalize">{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
              
            </div>
          </div>{" "}
          <div>
            <h1 className="text-sm font-bold">{km} Km</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className="  text-xl ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600 capitalize">{props.ride?.pickUp}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className=" text-xl ri-square-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600 capitalize">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2  my-1 border-gray-200  ">
            <i className="  text-xl  ri-bank-card-2-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">₹ {props.ride?.fare}</h3>
              <p className=" text-sm  text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full mt-3">
          <button
          onClick={() => {
            props.setConfirmRidePopUp(true);
            props.confirmRide()
          }}
          className="  cursor-pointer bg-green-400 text-white font-semibold p-3 px-4 rounded-xl"
        >
          Accept
        </button>

        <button
          onClick={() => {
            props.setRidePopUp(false);
          }}
          className="  cursor-pointer bg-gray-300 text-white font-semibold p-3 px-4 rounded-xl"
        >
          Ignore
        </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
