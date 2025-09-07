const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapsController = require("../controllers/maps.controller");
const { query } = require("express-validator");

// Get coordinates for single address
router.get(
  "/coordinates",
  [query("address").isString().isLength({ min: 3 })],
  authMiddleware.authUser,
  mapsController.getCoordinates
);

// NEW: Get distance between two addresses
router.get(
  "/distance",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  authMiddleware.authUser,
  mapsController.getDistance
);

// router.get(
//   "/get-suggestions",
// [  query("input").isString().isLength({ min: 3 })],
//   authMiddleware.authUser,
//   mapsController.getAutoCompleteSuggestions
// );


module.exports = router;
