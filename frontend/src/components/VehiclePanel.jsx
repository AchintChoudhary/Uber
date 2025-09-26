// frontend/src/components/VehiclePanel.jsx
import React from "react";

const VehiclePanel = (props) => {
  const { fare = {}, selectVehicle, setConfirmRidePanel, setVehiclePanel, vehicleType } = props;

  const vehicleCard = (type, label, imgSrc, price) => (
    <div
      onClick={() => {
        selectVehicle(type);
        setConfirmRidePanel(true);
        setVehiclePanel(false);
      }}
      className={`flex items-center gap-4 p-3 rounded-xl mb-3 cursor-pointer transition-shadow ${
        vehicleType === type ? "shadow-lg border-2 border-indigo-400" : "border"
      }`}
    >
      <img src={imgSrc} alt={label} className="w-16 h-12 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold capitalize">{label}</h3>
        <h2 className="text-lg font-bold">₹ {price ?? "--"}</h2>
        <p className="text-sm text-gray-600">Cash</p>
      </div>
    </div>
  );

  return (
    <>
      <h5
        onClick={() => props.setVehiclePanel(false)}
        className="w-[93%] text-center top-0 absolute"
      >
        <i className="ri-arrow-down-s-line text-gray-400 text-3xl"></i>
      </h5>

      <h1 className="font-semibold text-2xl mb-5">Choose a Vehicle</h1>

      {/* Motorcycle (previously 'moto') */}
      {vehicleCard(
        "motorcycle",
        "Moto",
        "https://cdn-icons-png.flaticon.com/512/743/743007.png",
        fare?.motorcycle ?? "--"
      )}

      {/* Car */}
      {vehicleCard(
        "car",
        "Car",
        "https://cdn-icons-png.flaticon.com/512/743/743131.png",
        fare?.car ?? "--"
      )}

      {/* Auto */}
      {vehicleCard(
        "auto",
        "Auto",
        "https://cdn-icons-png.flaticon.com/512/3448/3448643.png",
        fare?.auto ?? "--"
      )}
    </>
  );
};

export default VehiclePanel;
