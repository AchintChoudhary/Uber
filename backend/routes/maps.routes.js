const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const getCoordinates = require('../controllers/maps.controller');
const { query } = require('express-validator');


router.get('/get-coordinate',
  [
    query('address').isString().isLength({ min: 4 })
  ],
  authMiddleware.authUser,
  getCoordinates.getCoordinates // Make sure this is a function reference
);

// Add this route for testing API connectivity
router.get('/test-api', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "API key not found in environment variables"
      });
    }

    // Test with a simple address
    const testResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: "New York, USA",
        key: apiKey
      }
    });

    res.status(200).json({
      success: true,
      apiKeyExists: !!apiKey,
      apiResponse: testResponse.data
    });

  } catch (error) {
    console.error("API test error:", error.message);
    res.status(500).json({
      success: false,
      message: "API test failed: " + error.message,
      apiKeyExists: !!process.env.GOOGLE_MAPS_API
    });
  }
});






module.exports = router;