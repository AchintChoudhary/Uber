const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel=require('../models/blacklistToken.model')


module.exports.registerCaptain=async(req,res,next)=>{
    const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

const {   fullname,
  email,
  password,
  vehicle
 } = req.body;

const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }
  //hash method
  const hashPassword = await captainModel.hashPassword(password)

  const captain=await captainService.createCaptain({
      firstname:fullname.firstname,
  lastname:fullname.lastname,
  email,
  password:hashPassword,
  color:vehicle.color,
  plate:vehicle.plate,
  capacity:vehicle.capacity,
  vehicleType:vehicle.vehicleType,
  })

  const token=captain.generateAuthToken();

res.status(201).json({token,captain})
}


module.exports.loginCaptain=async(req,res,next)=>{
     const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

const {email,password}=req.body;

 const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "invalid email or password" });
  }

//compare  password method
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token=captain.generateAuthToken()
res.cookie('token',token)
res.status(200).json({token,captain})
}

module.exports.getCaptainProfile=async(req,res,next)=>{
res.status(200).json(req.captain)
}


module.exports.logoutCaptain=async(req,res,next)=>{
     // Client side se token cookie ko clear karna
      res.clearCookie('token');
      const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    
      // Current token ko cookies ya header se nikalna
      await blacklistTokenModel.create({token})
      res.status(200).json({message:'Logged out'})
}