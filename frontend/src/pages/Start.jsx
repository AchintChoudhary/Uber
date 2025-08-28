import React from 'react'
import {Link} from "react-router-dom"
const Start = () => {
  return (
    <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_896,w_1344/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg)]  h-screen pt-8  flex justify-between flex-col w-full'>
        <img  className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div className='bg-white py-4 pb-7 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white rounded-sm py-3 mt-4'>Continue</Link>
        </div>
    </div>
  )
}

export default Start