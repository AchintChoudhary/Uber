// frontend/src/pages/Home.jsx
import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import LiveTracking from "./components/LiveTracking";
import { useGSAP } from "@gsap/react"; // for animation
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import "remixicon/fonts/remixicon.css";
import LocationPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

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
  const [vehicleType, setVehicleType] = useState(null); // will be 'motorcycle'|'car'|'auto'
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;

    const onRideConfirmed = (rideData) => {
      setWaitingForDriverPanel(true);
      setVehicleFound(false);
      setRide(rideData);
    };
    const onRideStarted = (rideData) => {
      setWaitingForDriverPanel(false);
      navigate("/riding", { state: { ride: rideData } });
    };

    socket.on("ride-confirmed", onRideConfirmed);
    socket.on("ride-started", onRideStarted);

    return () => {
      socket.off("ride-confirmed", onRideConfirmed);
      socket.off("ride-started", onRideStarted);
    };
  }, [socket, navigate]);

  // Get fare
  const submitHandler = async (e) => {
    e.preventDefault();
    if (pickup.trim() === "" || destination.trim() === "") return;

    try {
      setLoadingFare(true);
      // /rides/get-fare does not strictly require auth server-side in your code,
      // but including the header is harmless and consistent.
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setFare(response.data.fare || {});
      setVehiclePanel(true);
      setPanelOpen(false);
    } catch (err) {
      console.error("Error fetching fare:", err);
      alert("Failed to fetch fare: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingFare(false);
    }
  };

  // Create ride (protected)
  async function createRide() {
    // Guard: must be logged in and must choose a vehicle
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create a ride");
      navigate("/login");
      return;
    }
    if (!vehicleType) {
      alert("Please choose a vehicle type");
      setVehiclePanel(true);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend returns created ride (or a confirmation)
      console.log("Ride created:", response.data);

      // show looking-for-driver panel
      setVehicleFound(true);
      setVehiclePanel(false);
      setConfirmRidePanel(false);
    } catch (err) {
      console.error("createRide error:", err);
      alert("Could not create ride: " + (err.response?.data?.message || err.message));
      // If the server returns 401, force logout
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }

  // GSAP animations preserved (unchanged)
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
        className="absolute w-16 ml-8 mt-5 z-30 pointer-events-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo"
      />

      {/* MAP */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Panels container */}
      <div
        ref={panelRef}
        className="fixed bottom-0 z-20 pointer-events-none w-full"
        style={{ height: 0 }}
      >
        {/* Location search panel */}
        <div className="pointer-events-auto p-4 bg-white rounded-t-2xl shadow-xl">
          <LocationPanel
            pickup={pickup}
            destination={destination}
            setPickUp={setPickUp}
            setDestination={setDestination}
            setPanelOpen={setPanelOpen}
            submitHandler={submitHandler}
            loadingFare={loadingFare}
          />
        </div>
      </div>

      {/* Vehicle selector */}
      <div
        ref={vehiclePanelRef}
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={(type) => setVehicleType(type)}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          vehicleType={vehicleType}
        />
      </div>

      {/* Confirm ride (summary & confirm) */}
      <div
        ref={confirmRidePanelRef}
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          createRide={createRide}
        />
      </div>

      {/* Looking for Driver */}
      <div
        ref={vehicleFoundRef}
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
      >
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Waiting for Driver */}
      <div
        ref={waitingForDriverRef}
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
      >
        <WaitForDriver ride={ride} setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
