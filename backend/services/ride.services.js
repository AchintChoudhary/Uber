const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getFare(pickUp, destination) {
  if (!pickUp || !destination) {
    throw new Error('pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceBetweenAddresses(pickUp, destination);

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Failed to fetch distance/duration from map service");
  }

  const baseFare = { auto: 30, car: 50, moto: 20 };
  const perKmRate = { auto: 10, car: 15, moto: 8 };
  const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

  const fare = {
    auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
    car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
    moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
  };

  return { fare, distanceTime };
}

module.exports={getFare,};

async function getOtp(){
return Math.floor(100000 + Math.random() * 900000).toString();

}






async function createRide({ user, pickup, destination, vehicleType }) {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const { fare, distanceTime } = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickUp: pickup,
    destination,
    fare: fare[vehicleType],
    otp:await getOtp(),
    distance: distanceTime.distance.value,
    duration: distanceTime.duration.value
  });

  return ride;
}

module.exports = {
  getFare,
  createRide
};
