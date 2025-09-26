const rideService = require("../services/ride.services");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  console.log("request body", { pickup, destination, vehicleType });

  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" }); // ✅ clearer error
    }

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapService.getCoordinates(pickup);
    console.log("this is pickup coordinates", pickupCoordinates);

    const captainsInRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.latitude,
      pickupCoordinates.longitude,
      10
    );

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      console.log(captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    return res.status(201).json({ ride });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
