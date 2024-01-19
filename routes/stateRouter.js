const express = require('express');
const router = express.Router()
const {protect}= require('../middleware/authToken')
const addState=require('../controller/addStates');
const allStates=require('../controller/allStates')
const editStateName=require('../controller/editStateName')

router.post('/addstates',protect,addState);
router.get('/allstates',protect,allStates);
router.put('/editstatename',protect,editStateName)


module.exports=router