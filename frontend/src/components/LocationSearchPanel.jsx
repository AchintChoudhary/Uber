import React from "react";

const LocationSearchPanel = (props) => {

  const location = [
    "22, Theatre Road, Elgin,West Bengal",
    "23, Theatre Road, Elgin,West Bengal",
    "24, Theatre Road, Elgin,West Bengal",
  ];

  return (
    <>
      <div className="px-4">
        {location.map((item,idx) => {
          return (
            <div  onClick={()=>{
              props.setVehiclePanel(true)
              props.setPanelOpen(false)
            }} key={idx} className="flex items-center   p-3 rounded-xl border border-gray-300 hover:border-black justify-start my-4 gap-4">
              <h2 className="text-2xl bg-[#eee] flex items-center justify-center h-10 w-10 rounded-xl">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <p className="text-lg font-medium">{item}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationSearchPanel;
