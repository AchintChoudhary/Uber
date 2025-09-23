import React from 'react'

const WaitingForDriver = (props) => {
  return (
   <div>
      <h5
        onClick={()=>{
props.setWaitingForDriverPanel(false)
        }}
        className=" w-[93%] text-center top-0 absolute  "
      >
        <i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i>
      </h5>

<div> 
    <div className="flex items-center space-x-4 justify-around">
        <img
          src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
          alt="Driver"
          className="w-18 h-18 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg font-semibold">{props.ride?.captain.fullname.firstname +" "+ props.ride?.captain.fullname.lastname}</h2>
          <p className="text-gray-800 font-bold text-lg">{props.ride?.captain.vehicle.plate}</p>
          <p className="text-gray-500 text-sm">White Suzuki S-Presso LXI</p>
          <p className="text-yellow-500 font-medium">⭐ 4.9</p>
           <p className="text-black font-medium">{props.ride?.otp}</p>
        </div>
      </div>
    

      {/* Message Box */}
      <div className="mt-4">
        <input
          type="text"
         
          
          placeholder="Send a message..."
          className="w-full border rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div></div>

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
      
      </div>
    </div>





  )
}

export default WaitingForDriver