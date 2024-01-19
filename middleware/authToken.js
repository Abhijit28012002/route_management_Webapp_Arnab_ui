const jwt = require("jsonwebtoken");
const User = require('../models/AdminModel');
// const IP = require("ip");

const protect = async (req, res, next) => {
 
  // const auth_token=req.cookies.jwt;
  // console.log(auth_token)




  

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // if(auth_token){
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.userData.id).select("-password");

      // const decoded = await jwt.verify(auth_token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.userData.id).select("-password");    


      // const ipAddress = IP.address();
      // console.log(ipAddress)
      // console.log(tokenuser.systemip)

      // if(tokenuser.systemip!==ipAddress){
      //   return res.json({success:false, msg:'Ip address is not correct'});

      // }
      

      // req.user=tokenuser
      next();
    } catch (error) {
      return res.json({success:false, msg:'Token is not correct'});
    //   throw new Error("Not authorized, token failed");
    }
  }

  // if (!auth_token) {
  //   // res.status(401);
  //   return res.json({success:false, msg:'Token is not there'});
  //   // throw new Error("Not authorized, no token");
  // }
};

module.exports = { protect };