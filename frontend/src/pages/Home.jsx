import React, { useRef, useState,useContext,useEffect } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react"; // for animation
import gsap from "gsap";
import { SocketContext } from '../context/SocketContext';
import "remixicon/fonts/remixicon.css"; // For icon
import LocationPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [fare, setFare] = useState({});
  const [loadingFare, setLoadingFare] = useState(false);
const [vehicleType, setVehicleType] = useState(null)
  const panelRef = useRef(null); // This is for locations
  const panelCloseRef = useRef(null); // This is down button
  const vehiclePanelRef = useRef(null); // This is for vehicle
  const confirmRidePanelRef = useRef(null); // This is for confirmRide
  const vehicleFoundRef = useRef(null); // this is for looking for driver
  const waitingForDriverRef = useRef(null); // this is for waiting for driver



 const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
     
        socket.emit("join", { userType: "user", userId: user._id })
    })








  const submitHandler = async (e) => {
    e.preventDefault();

    if (pickup.trim() !== "" && destination.trim() !== "") {
      try {
        setLoadingFare(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: { pickup, destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Fare response:", response.data);
        setFare(response.data.fare);

        // ✅ open panel only after fare is set
        setVehiclePanel(true);
        setPanelOpen(false);
      } catch (err) {
        console.error("Error fetching fare:", err);
      } finally {
        setLoadingFare(false);
      }
    }
  };


async function createRide(){
const response=await  axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
    pickup,
    destination,
    vehicleType
  },{ headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
}

)
console.log(response.data)
}




  // Animations for panels
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%" });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%" });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriverPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriverPanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="absolute w-16 ml-8 mt-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="object-cover h-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>

      {/* Bottom panels */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Main input panel */}
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute text-3xl top-3 right-3 opacity-0 cursor-pointer"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div>
              <div className="line bg-black absolute w-1 top-[37%] left-8 h-14"></div>
            </div>

            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full my-2"
              onClick={() => setPanelOpen(true)}
              required
              value={pickup}
              onChange={(e) => setPickUp(e.target.value)}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full"
              onClick={() => setPanelOpen(true)}
              value={destination}
              required
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-black rounded-xl text-white font-bold mt-3 w-full"
            >
              Find Trip
            </button>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            loadingFare={loadingFare}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6"
      >
        <VehiclePanel
       
        selectVehicle={setVehicleType}
          fare={fare}
          loadingFare={loadingFare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride */}
      <div
        ref={confirmRidePanelRef}
        className="fixed translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6"
      >
        <ConfirmRide
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={fare}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* Looking for Driver */}
      <div
        ref={vehicleFoundRef}
        className="fixed translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6"
      >
        <LookingForDriver
         createRide={createRide}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={fare}
        setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting for Driver */}
      <div
        ref={waitingForDriverRef}
        className="fixed translate-y-full w-full z-10 bottom-0 bg-white px-3 py-6"
      >
        <WaitForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
