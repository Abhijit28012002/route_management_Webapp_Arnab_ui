const Town = require("../models/TownModel");

const editTownName=async(req,res)=>{
  try{
        const townname=req.body.townname;
        const towncode=req.body.towncode;
        if(!townname||!towncode){
            res.json({success:false , msg:'send all fields'})
          }
          const townexists = await Town.findOne({ towncode });
          if (!townexists) {
            res.json({ success: false, msg: "No such town" });
            return;
          }
          const response=await Town.findOneAndUpdate({towncode:towncode},{townname:townname},{new:true});

          res.json ({success:true, msg:'The townname edited successfully'})}

          catch(error){
            console.log(error);
            res.json({ success: false });
          }

}
module.exports=editTownName