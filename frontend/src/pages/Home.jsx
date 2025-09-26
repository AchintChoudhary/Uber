import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
import { useGSAP } from "@gsap/react"; // for animation
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import "remixicon/fonts/remixicon.css"; // For icon
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
  const [vehicleType, setVehicleType] = useState(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        setFare(response.data.fare);
        setVehiclePanel(true);
        setPanelOpen(false);
      } catch (err) {
        console.error("Error fetching fare:", err);
      } finally {
        setLoadingFare(false);
      }
    }
  };

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      // After creating ride you may want to show the 'looking for driver' panel
      setVehicleFound(true);
      setVehiclePanel(false);
      setConfirmRidePanel(false);
    } catch (err) {
      console.error("createRide error:", err);
      alert("Could not create ride: " + (err.response?.data?.message || err.message));
    }
  }

  // GSAP animations (unchanged)
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

      {/* MAP: full-screen, but placed at z-0 so UI overlays are interactive */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>

      {/* Panels container: it covers full screen but DOES NOT block pointer events,
          except the children with pointer-events-auto will handle input.
          This trick lets the map be interactive where there are no UI elements. */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
        {/* Main input panel (bottom portion) */}
        <div className="h-[30%] p-5 bg-white relative z-20 pointer-events-auto">
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

        <div ref={panelRef} className="bg-white h-0 pointer-events-auto z-20">
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
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
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
        className="fixed translate-y-full w-full z-20 bottom-0 bg-white px-3 py-6 pointer-events-auto"
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
