// backend/services/maps.service.js
const axios = require('axios');

// Get coordinates using OpenStreetMap Nominatim
const getCoordinates = async (address) => {
  const url = "https://nominatim.openstreetmap.org/search";
  
  try {
    console.log("Requesting coordinates for address:", address);
    
    const response = await axios.get(url, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'UberApp/1.0 (your@email.com)' // REQUIRED by Nominatim
      },
      timeout: 10000
    });

    console.log("OpenStreetMap Response count:", response.data.length);
console.log(response)
    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      console.log("Coordinates found:", result.lat, result.lon);
      
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        display_name: result.display_name,
        
      };
    } else {
      throw new Error('Address not found in OpenStreetMap');
    }
  } catch (error) {
    console.error("OpenStreetMap Error:", error.message);
    throw error;
  }
};

// Calculate distance using OSRM (Open Source Routing Machine)
const getDistanceOSRM = async (originCoords, destinationCoords) => {
  const url = "https://router.project-osrm.org/route/v1/driving/";
  
  try {
    const coordinates = `${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}`;
    
    const response = await axios.get(`${url}${coordinates}`, {
      params: {
        overview: 'false',
        geometries: 'geojson'
      },
      timeout: 10000
    });

    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      
      return {
        distance: {
          text: `${(route.distance / 1000).toFixed(2)} km`,
          value: route.distance // meters
        },
        duration: {
          text: `${Math.round(route.duration / 60)} mins`,
          value: route.duration // seconds
        }
      };
    } else {
      throw new Error('No route found');
    }
  } catch (error) {
    console.error("OSRM Error:", error.message);
    throw error;
  }
};


// Get distance between two addresses
const getDistanceBetweenAddresses = async (originAddress, destinationAddress) => {
  try {
    console.log("Getting coordinates for:", originAddress, "and", destinationAddress);
    
    // Get coordinates for both addresses
//This line is running two async requests in parallel and waiting for both to finish.
    const [originCoords, destinationCoords] = await Promise.all([
      getCoordinates(originAddress),
      getCoordinates(destinationAddress)
    ]);

    console.log("Coordinates found:", originCoords, destinationCoords);
    
    // Calculate distance using OSRM
   const distanceData = await getDistanceOSRM(originCoords, destinationCoords);


    return {
        origin: originCoords,
  destination: destinationCoords,
  distance: distanceData.distance,
  duration: distanceData.duration
    };
    
  } catch (error) {
    console.error("Distance calculation error:", error.message);
    throw error;
  }
};


// const getAutoCompleteSuggestions=async(input)=>{
// if(!input){
//   throw new Error('Input is required');

// }

// const url="https://nominatim.openstreetmap.org/search";

// try {
//   const response = await axios.get(url) 
//    if(response.data.status==='0K'){
//     return response.data.predictions;
//    }else{
//     throw new Error('unable to fetch predictions')
//    }
//   }catch(error){
//   console.error("OpenStreetMap Error:", error.message);
//   throw error;
// }
// }






module.exports = { 
  getCoordinates, 
  getDistanceBetweenAddresses,
  getDistanceOSRM,
 
};