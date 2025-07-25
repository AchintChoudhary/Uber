import React from 'react'
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div className='bg-cover bg-left bg-[url(https://img.freepik.com/free-vector/taxi-app-concept_23-2148476451.jpg?semt=ais_hybrid&w=740)]  h-screen pt-8  flex justify-between flex-col w-full bg-red-400'>
        <img  className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div className='bg-white py-4 pb-7 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white rounded-sm py-3 mt-4'>Continue</Link>
        </div>
    </div>
  )
}

export default Home