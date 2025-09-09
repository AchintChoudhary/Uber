const rideService=require('../services/ride.services')
const {validationResult}=require('express-validator')


module.exports.createRide=async(req,res)=>{


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


module.exports.getFare=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {pickup,destination}=req.query;

    try{
        const fare=await rideService.getFare(pickup,destination)
        return res.status(200).json(fare);   //return fare as it is in json

    }catch(err){
return res.status(500).json({message:err.message})
    }

}
