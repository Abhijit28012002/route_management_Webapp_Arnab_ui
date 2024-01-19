const State = require("../models/StateModel");

const allStates = async (req, res) => {
  try {
    const response = await State.find({});
    return res.json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = allStates;


