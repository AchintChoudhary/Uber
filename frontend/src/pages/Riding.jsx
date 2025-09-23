import React from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

const Riding = () => {
  const location=useLocation()
  const {ride}=location.state || {}
  const navigate=useNavigate()
const { socket } = useContext(SocketContext)

 useEffect(() => {
  socket.on('ride-ended', () => {
    navigate('/home');
  });
 }, [socket, navigate]);



  return (
    <div className='h-screen'>
 <Link  to='/home' className= 'fixed top-2 left-2  bg-white flex items-center   w-10 h-10 justify-center rounded-full'>
    <i className=" text-lg font-bold  ri-home-2-line"></i>
 </Link>

        <div className='h-1/2'>
            <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/>
        </div>
<div className='h-1/2 p-3'> 
<div> 
    <div className="flex items-center space-x-4 justify-around">
        <img
          src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
          alt="Driver"
          className="w-18 h-18 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg font-semibold capitalize">{ride?.captain.fullname.firstname+" "+ride?.captain.fullname.lastname}</h2>
          <p className="text-gray-800 font-bold text-lg">{ride?.captain.vehicle?.plate}</p>
          <p className="text-gray-500 text-sm">White Suzuki S-Presso LXI</p>
          <p className="text-yellow-500 font-medium">⭐ 4.9</p>
        </div>
      </div>
    </div>
       <div className="flex gap-5 flex-col justify-between items-center">
        

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 my-1 border-gray-200  ">
            <i className="  text-xl ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-xl font-semibold capitalize">562/11-A</h3>
              <p className=" text-sm  text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          

          <div className="flex items-center gap-5 p-2  my-1 border-gray-200  ">
            <i className="  text-xl  ri-bank-card-2-fill"></i>
            <div>
              <h3 className="text-xl font-semibold">₹ {ride?.fare}</h3>
              <p className=" text-sm  text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      
      </div>
     
      <button className="w-full mt-3 cursor-pointer rounded-lg bg-green-600 text-white font-semibold p-2">Make a payment</button>
</div>



    </div>
  )
}

export default Riding