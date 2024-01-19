const express = require('express');
const router = express.Router()
const {protect}= require('../middleware/authToken')
const addDistrict=require('../controller/addDistrict')
const allDistrict=require('../controller/allDistricts')
const editDistrictName=require('../controller/editDistrictName')

router.post('/adddistricts',protect,addDistrict);

router.get('/alldistricts/:statecode',protect,allDistrict)

router.put('/editdistrictname',protect,editDistrictName)




module.exports=router