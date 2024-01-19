const State = require("../models/StateModel");

const editStateName = async (req, res) => {
  try{
  const statename = req.body.statename;
  const statecode = req.body.statecode;
  if(!statename||!statecode){
    res.json({success:false , msg:'send all fields'})
  }

  const stateexists = await State.findOne({ statecode });
  if (!stateexists) {
    res.json({ success: false, msg: "No such state" });
    return;
  }
  const response=await State.findOneAndUpdate({statecode:statecode},{statename:statename},{new:true});
  // console.log(response);

  res.json ({success:true, msg:'The statename edited successfully'})
  }catch(error){
    console.log(error);
    res.json({ success: false });
  }

};
module.exports = editStateName;
