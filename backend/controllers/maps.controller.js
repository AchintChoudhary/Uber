
const mapServices = require('../services/maps.service')
const { validationResult } = require('express-validator')

// Get coordinates for single address
module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { address } = req.query;

  try {
    const coordinates = await mapServices.getCoordinates(address);
   // Data will come from MapServices
    res.status(200).json({
      success: true,
      data: coordinates    //coordinates
    });

  } catch (err) {
    console.error("Controller error:", err.message);
    res.status(404).json({ 
      success: false,
      message: 'Coordinates not found: ' + err.message 
    });
  }
};

// NEW: Get distance between two addresses
module.exports.getDistance = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { origin, destination } = req.query;
  
  if (!origin || !destination) {
    return res.status(400).json({
      success: false,
      message: 'Both origin and destination addresses are required'
    });
  }

  try {
    const distanceData = await mapServices.getDistanceBetweenAddresses(origin, destination);
    res.status(200).json({
      success: true,
      data: distanceData
    });
  } catch (err) {
    console.error("Distance error:", err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Distance calculation failed: ' + err.message 
    });
  }
};



// module.exports.getAutoCompleteSuggestions=async(req,res,next)=>{
//   try{
// const error=validationResult(req);
// if(!error.isEmpty()){
//   return res.status(400).json({errors:error.array()})
// }
// const {input}=req.query;
// const suggestions=await mapServices.getAutoCompleteSuggestions(input);
// res.status(200).json(suggestions);
// }catch(error){
// console.error(error);
// res.status(500).json({message:'Internal server error'});
// }
// }




