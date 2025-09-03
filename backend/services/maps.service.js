const axios = require('axios');

const getCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  
  // Debug: Check if API key is loaded
  console.log("API Key exists:", !!apiKey);
  if (!apiKey) {
    throw new Error('Google Maps API key is missing');
  }

  const url = "https://maps.googleapis.com/maps/api/geocode/json";
  
  try {
    console.log("Requesting coordinates for address:", address);
    
    const response = await axios.get(url, {
      params: {
        address: address,
        key: apiKey
      },
      timeout: 10000 // 10 second timeout
    });

    console.log("Google API Response status:", response.data.status);
    console.log("Google API Response results:", response.data.results?.length);

    // Check if Google successfully found the address
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      
      console.log("Coordinates found:", location);
      
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      // More detailed error messages
      console.error("Google API Error status:", response.data.status);
      console.error("Google API Error message:", response.data.error_message || 'No error message');
      
      throw new Error(`Google API error: ${response.data.status} - ${response.data.error_message || 'Unable to fetch coordinates'}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:");
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      console.error("Request config:", error.config);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
    }
    
    throw error;
  }
};

module.exports = { getCoordinates };