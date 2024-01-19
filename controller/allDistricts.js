const State = require("../models/StateModel");
const District = require("../models/DistrictModel");

const allDistricts = async (req, res) => {
  try {
    const statecode = req.params.statecode;

    if (!statecode) {
      return res.status(400).json({ success: "false", msg: "Send statecode" });
    }
    const stateexists = await State.findOne({ statecode });

    if (!stateexists) {
      res.json({ success: false, msg: "No such state" });
      return;
    }
    const districts = await District.find({ state: stateexists });

    if (districts.length === 0) {
      res.json({
        success: false,
        msg: "No district is this state is there",
        statename: stateexists.statename,
        statecode: stateexists.statecode,
      });
      return;
    }
    return res.json({
      success: true,
      data: districts,
      statename: stateexists.statename,
      statecode: stateexists.statecode,
    });
  } catch (error) {
    res.json({ success: false });
  }
};
module.exports = allDistricts;
