const mapServices=require('../services/maps.service')
const {validationResult}=require('express-validator')

module.exports.getCoordinates=async(req,res,next)=>{
const error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
}



    const {address}=req.query

try{
    const coordinates=await mapServices.getCoordinates(address);
    res.status(200).json(coordinates);

}catch(err){
res.status(404).json({messsage:'Coordinates not found'+err})
}


}
















