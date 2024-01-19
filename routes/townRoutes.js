const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authToken");
const addTown = require("../controller/addTown");
const editTownName=require("../controller/editTownName")
const allTowns = require("../controller/allTowns");

router.post("/addtowns", protect, addTown);
router.get("/alltowns/:districtcode", protect, allTowns);
router.put("/edittownname",protect,editTownName)

module.exports = router;
