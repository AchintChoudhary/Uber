const rideService=require('../services/ride.services')
const {validationResult}=require('express-validator')


module.exports.createRide=async(req,res)=>{
console.log('create ride end point hit')

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
const {pickup,destination,vehicleType}=req.body
console.log('request body',{pickup,destination,vehicleType})
try{
const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});

return   res.status(201).json({ride}); 
}catch(err){
    
return res.status(400).json({message:err.message});
}
}
