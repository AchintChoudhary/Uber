const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");

async function getFare(pickUp, destination) {
  if (!pickUp || !destination) {
    throw new Error("pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceBetweenAddresses(
    pickUp,
    destination
  );

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Failed to fetch distance/duration from map service");
  }

  // ✅ added motorcycle support
  const baseFare = { auto: 30, car: 50, motorcycle: 20 };
  const perKmRate = { auto: 10, car: 15, motorcycle: 8 };
  const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
        (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
    ),
  };

  return { fare, distanceTime };
}

async function getOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const { fare, distanceTime } = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickUp: pickup,
    destination,
    fare: fare[vehicleType],
    otp: await getOtp(),
    distance: distanceTime.distance.value,
    duration: distanceTime.duration.value,
  });

  return ride;
}

const confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

async function startRide({ rideId, otp, captain }) {
  if (!rideId || !otp || !captain) {
    throw new Error("rideId, otp and captain are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "accepted") throw new Error("Ride not accepted");
  if (ride.otp !== otp) throw new Error("Invalid otp");

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
}

async function endRide({ rideId, captain }) {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "ongoing") throw new Error("Ride not ongoing");

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;
}

module.exports = {
  getFare,
  createRide,
  confirmRide,
  startRide,
  endRide,
};
