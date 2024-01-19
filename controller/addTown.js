const Town = require("../models/TownModel");
const District = require("../models/DistrictModel");
const State = require("../models/StateModel");

const addTown = async (req, res) => {
  try {

    const districtcode = req.body.districtcode;
    const statecode = req.body.statecode;
    const townname = req.body.townname;
    let ismaintown = req.body.ismaintown;

    if(!ismaintown){
      ismaintown=false;
    }

   

    if (!districtcode || !townname || !statecode) {
      return res.json({ success: false, msg: "Send all fields" });
    }

    const stateexists = await State.findOne({ statecode });
    if (!stateexists) {
      res.json({ success: false, msg: "No such state" });
      return;
    }
    const districtexists = await District.find({ state: stateexists });

    if (districtexists.length === 0) {
      res.json({ success: false, msg: "No districts in that state" });
      return;
    }


    const filteredDitricts = districtexists.filter(
      (district) => district.districtcode == districtcode
    );


    if (filteredDitricts.length === 0) {
      return res.json({
        success: false,
        msg: "This district is not on the state",
      });
    }

    const towns = await Town.find({ district: filteredDitricts[0] });

    if (towns.length > 0) {
      const towncode = towns[towns.length - 1].towncode + 1;
      const uniqueTowncode = towncode;

      const filteredTowns = towns.filter((town) => town.townname === townname);
      if (filteredTowns.length > 0) {
        return res.json({ success: false, msg: "This data already exists" });
      }
      await Town.create({
        towncode: uniqueTowncode,
        townname: townname,
        ismaintown: ismaintown,
        state: stateexists,
        district: filteredDitricts[0],
      });

      return res.json({ success: true, msg: "Town created successfully" });
    }
    const towncode = 1;
    const districtCodeStr = districtcode.toString().padStart(5, "0");
    const towncodestr = towncode.toString().padStart(6, "0");
    const uniqueTowncode = districtCodeStr + towncodestr;
    await Town.create({
      towncode: uniqueTowncode,
      townname: townname,
      ismaintown: ismaintown,
      state: stateexists,
      district: filteredDitricts[0],
    });
    return res.json({ success: true, msg: "Town created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = addTown;
