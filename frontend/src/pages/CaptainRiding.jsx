import React, { useRef, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const CaptainRiding = () => {
 const location=useLocation()
 const rideData=location.state?.ride
    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    
    const finishRidePanelRef = useRef(null)

 useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])


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

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                  onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
 <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                   ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>




    </div>
  )
}

export default CaptainRiding