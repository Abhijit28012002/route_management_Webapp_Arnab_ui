const User=require('../models/AdminModel')
const logout=async(req,res)=>{
    try {
        // const user=await User.findByIdAndUpdate(req.user.id,{systemip:null},{new:true})
        res.clearCookie('jwt')
        res.json({success:true, msg:'Logout done successfully'})
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}
module.exports=logout