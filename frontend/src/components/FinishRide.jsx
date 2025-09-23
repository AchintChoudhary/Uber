import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate();

 async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }


  return (
     <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
               props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div>
        <div className="flex items-center space-x-4 justify-between bg-amber-400 p-2 rounded-xl">
          <div className="flex items-center space-x-4 justify-start">
            <img
              src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
              alt="Driver"
              className="w-18 h-18 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
              
            </div>
          </div>{" "}
          <div>
            <h1 className="text-sm font-bold">2.8 Km</h1>
          </div>
        </div>
      </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
               <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className="  text-xl ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600">{props.ride?.pickUp}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className=" text-xl ri-square-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">562/11-A</h3>
              <p className=" text-sm  text-gray-600">{props.ride?.destination}</p>
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

                <div className='mt-10 w-full'>

                    <button
                      onClick={endRide}
                        className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>


                </div>
            </div>
        </div>
  )
}

export default FinishRide