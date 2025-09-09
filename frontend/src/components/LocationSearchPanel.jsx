import React from "react";

const LocationSearchPanel = (props) => {

 if (props.loadingFare) {
    return (
      <div className="px-4 text-center py-10">
        <p className="text-lg font-medium text-gray-500">Calculating fare...</p>
      </div>
    );
  }


  return (
    <>
      <div className="px-4">
        <div
         
          className=" items-center p-3  border-gray-300 hover:border-black  my-10"
        >
          
          <p className="text-lg font-medium text-gray-400 ">Suggestions option coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default LocationSearchPanel;
