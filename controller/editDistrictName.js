const District = require("../models/DistrictModel");
const editDistrictName = async (req, res) => {
  try{
  const districtname = req.body.districtname;
  const districtcode = req.body.districtcode;
  if (!districtcode || !districtname) {
    res.json({ success: false, msg: "send all fields" });
  }
  const districtexists = await District.findOne({ districtcode });
  if (!districtexists) {
    res.json({ success: false, msg: "No such district" });
    return;
  }

  const response = await District.findOneAndUpdate(
    { districtcode: districtcode },
    { districtname: districtname },
    { new: true }
  );


  res.json ({success:true, msg:'The districtname edited successfully'})}
  catch(error){
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = editDistrictName;
