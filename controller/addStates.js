const State = require("../models/StateModel");

const addState = async (req, res) => {
  try {
    const statecode = req.body.statecode;
    const statename = req.body.statename;
    const statecodeString = statecode.toString();

    if (!statecode || !statename) {
      return res.status(400).json({ success: "false", msg: "Send all fields" });
    }

    if (statecodeString.length > 2) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "More than two characters are not allowed",
        });
    }

    const stateexists = await State.findOne({ statecode });
    // console.log(stateexists)
    if (stateexists) {
      return res.status(400).json({ success: "Already Exists" });
    }
    const result = await State.create({
      statecode,
      statename,
    });

    // console.log(result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = addState;
