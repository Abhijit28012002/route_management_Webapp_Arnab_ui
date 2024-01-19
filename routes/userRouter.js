const express = require("express");
const router = express.Router();
const User = require("../models/AdminModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const IP = require("ip");
const {protect}= require('../middleware/authToken')

const logout = require("../controller/logout");


router.post(
  "/iamarnab",
  body("email").isEmail(),
  body("password", "incorrect Password").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: "false", msg: "Enter Valid details" });
      }
      let { email, password } = req.body;
      const userexists = await User.findOne({ email });
      if (userexists) {
        return res.status(400).json({ success: "Already Exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securepassword = await bcrypt.hash(password, salt);
      await User.create({
        email,
        password: securepassword,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "incorrect Password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(req.socket.remoteAddress);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      // const ipAddress = IP.address();
      // console.log(ipAddress);
      // if(!ipAddress){
      //   return res.json({success:false, errors:'Ip Address not there'})
      // }

      // console.log(userData);
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, errors: "Try logging valid credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success: false, errors: "Try logging valid credentials" });
      }

      // const clientIp = req.headers['cf-connecting-ip']|| req.headers['x-real-ip']||req.headers['x-forwarded-for'] || req.socket.remoteAddress||'';
      // console.log(clientIp);

      // await User.findOneAndUpdate({email},{systemip:ipAddress});

      const data = {
        userData: {
          id: userData.id,
        },
      };
      const authToken = await jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });


      // const cookieOptions={
      //   expires:new Date(
      //     Date.now()+ 1*24*60*60*1000
      //   ),
      //   // secure:true,
      //   httpOnly:true,
        
      // }

      // if(process.env.NODE_ENV= "production") cookieOptions.secure=true;

      // res.cookie("jwt",authToken,cookieOptions)

      return res.json({
        success: true,
        _id: userData._id,
        email: userData.email,
        token: authToken,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// router.get('/logout',protect,logout)

module.exports = router;
