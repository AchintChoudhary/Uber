import React from 'react'

const VehiclePanel = (props) => {
  
const vehicles=[
  {
    img:'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
name:'Moto',
capacity:1,
away:'3 mins away',
tagLine:'Affordable, Motocycle rides',
price:65.57
},{
 img:'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
name: 'UberAuto',
capacity:1,
away:'3 mins away',
tagLine:'',
price:113.20
},
{
   img:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png",
name:'UberGo',
capacity:4,
away:'2 mins away',
tagLine:'Affordable, compact rides',
price:193.20
}]

  
  
  return (
    <>
    <h5 onClick={()=>{
          props.setVehiclePanel(false)
        }} className="  w-[93%] text-center top-0 absolute  "><i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i></h5>
        <h1 className="font-semibold text-2xl mb-5">Choose a Vehicle</h1>
       {
        vehicles.map((item,idx)=>{
          return (
             <div    key={idx} onClick={()=>{
              props.setConfirmRidePanel(true)
              props.setVehiclePanel(false)
             }}          className="flex p-3 w-full mb-3 items-center justify-between border bg-gray-100 active:border-black  rounded-xl">
          <img
            className="h-15 w-18"
            src={item.img}
            alt="img"
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base">
              {item.name}{" "}
              <span >
                <i className="ri-user-fill"></i>{item.capacity}
              </span>
            </h4>
            <h5 className="font-medium text-sm">{item.away}</h5>
            <p className="font-normal text-xs text-gray-600">{item.tagLine}</p>
          </div>
          <h2 className="font-semibold text-xl">₹{item.price}</h2>
        </div>
          )
        })
       }
        
        
        </>
  )
}

export default VehiclePanel