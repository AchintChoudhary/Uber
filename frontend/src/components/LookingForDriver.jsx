import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={()=>{
            props.setVehicleFound(false)
        }}
        className=" w-[93%] text-center top-0 absolute  "
      >
        <i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i>
      </h5>
      <h1 className="font-semibold text-center text-2xl mb-5">Looking for nearby driver</h1>

      <div className="flex gap-5 flex-col justify-between items-center">
        <img
          className=" h-30 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
        />

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
      
      </div>
    </div>
  )
}

export default LookingForDriver