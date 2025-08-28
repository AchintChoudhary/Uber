import React, { useRef, useState } from "react";

import { useGSAP } from "@gsap/react"; //for animation
import gsap from "gsap";

import "remixicon/fonts/remixicon.css"; //For icon
import LocationPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);


  const panelRef = useRef(null); //This is for locations
  const panelCloseRef = useRef(null); //This is down button
  const vehiclePanelRef = useRef(null); //This  is for vehicle
  const confirmRidePanelRef = useRef(null); //This is for confirmRide
  const vehicleFoundRef = useRef(null); //this is for looking for driver
 const waitingForDriverRef= useRef(null);




  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);



  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className=" absolute w-16 ml-8 mt-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      ></img>
      <div className="h-screen w-screen">
        <img
          className="object-cover h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute text-3xl top-3 right-3 opacity-0"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div>
              <div className="rounded-full h-3 w-3 top-[35%] left-5 bg-[#afaeae] absolute"></div>
              <div className="line bg-[#afaeae] absolute w-1 top-[37%] left-6 h-14"></div>
              <div className="rounded-full h-3 w-3 top-[62%] left-5 bg-[#afaeae] absolute"></div>
            </div>

            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full my-2"
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickUp}
              onChange={(e) => {
                setPickUp(e.target.value);
              }}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full"
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white  h-0">
          <LocationPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed  translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6 "
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed  translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6 "
      >
        <ConfirmRide
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed  translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6 "
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>


 <div ref={waitingForDriverRef}  className="fixed  translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6 ">
       <WaitForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}/>
      </div>


    </div>
  );
};

export default Home;
