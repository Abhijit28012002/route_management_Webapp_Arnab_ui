const District = require("../models/DistrictModel");
const Town = require("../models/TownModel");

const allTowns = async (req, res) => {
  try {
    const districtcode = req.params.districtcode;
    if (!districtcode) {
      return res.status(400).json({ success: "false", msg: "Send statecode" });
    }
    const districtexists = await District.findOne({ districtcode }).populate(
      "state"
    );
    // console.log(districtexists);
    if (!districtexists) {
      res.json({ success: false, msg: "No such districts" });
      return;
    }

    const towns = await Town.find({ district: districtexists });

    return res.json({
      success: true,
      data: towns,
      districtname: districtexists.districtname,
      statename: districtexists.state.statename,
      statecode: districtexists.state.statecode,
    });
  } catch (error) {
    res.json({ success: false });
  }
};
module.exports = allTowns;
