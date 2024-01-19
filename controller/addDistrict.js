const State = require("../models/StateModel");
const District = require("../models/DistrictModel");

const addDistrict = async (req, res) => {
  try {
    const statecode = req.body.statecode;
    const districtname = req.body.districtname;
    if (!statecode || !districtname) {
      return res.status(400).json({ success: "false", msg: "Send all fields" });
    }
    const stateexists = await State.findOne({ statecode });
    //   console.log(stateexists);
    if (!stateexists) {
      res.json({ success: false, msg: "No such state" });
      return;
    }
    const districts = await District.find({ state: stateexists });
    // console.log(districts);

    if (districts.length > 0) {
      const districtcode = districts[districts.length - 1].districtcode + 1;

      const uniqueDistrictCode = districtcode;

      const filteredDistricts = districts.filter(
        (district) => district.districtname === districtname
      );
      if (filteredDistricts.length > 0) {
        return res.json({ success: false, msg: "This data already exists" });
      }
      await District.create({
        districtcode: uniqueDistrictCode,
        districtname: districtname,
        state: stateexists,
      });
      return res.json({ success: true, msg: "district created successfully" });
    } else {
      const districtcode = 1;
      const stateCodeStr = statecode.toString().padStart(2, "0");
      const districtCodeStr = districtcode.toString().padStart(3, "0");
      const uniqueDistrictCode = stateCodeStr + districtCodeStr;
      await District.create({
        districtcode: uniqueDistrictCode,
        districtname: districtname,
        state: stateexists,
      });
      return res.json({ success: true, msg: "district created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = addDistrict;
