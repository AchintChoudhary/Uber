import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext' 

const CaptainDetails = () => {
  const context = useContext(CaptainDataContext)
  
 
  
  const { captain } = context

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-b0.goenhance.ai/static/site/088b8580-efeb-4c05-89e9-a812af2c7459.webp"
              alt="Driver"
              className="w-15 h-15 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {captain.fullname?.firstname || 'Captain Name'}
              </h2>
              <p className="text-gray-500 text-sm font-medium">Basic level</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">₹ 295.50</h2>
            <p className="text-sm">Earned</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="flex item-center gap-3 mt-5 p-3 border justify-center border-amber-300 bg-amber-300 rounded-xl">
          <div className="text-center">
            <i className="text-2xl ri-time-line"></i>
            <h2 className="text-xl font-bold">10.2</h2>
            <p>Total Online</p>
          </div>
          <div className="text-center">
            <i className="text-2xl ri-speed-up-fill"></i>
            <h2 className="text-xl font-bold">10.2</h2>
            <p>Total Online</p>
          </div>
          <div className="text-center">
            <i className="text-2xl ri-line-chart-line"></i>
            <h2 className="text-xl font-bold">10.2</h2>
            <p>Total Online</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CaptainDetails