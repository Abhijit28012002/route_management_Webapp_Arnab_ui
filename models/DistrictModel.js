const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema=new Schema(
    {
        districtcode:{type:Number,unique:true,required:true},
        districtname:{type:String,required:true},
        state:{type:mongoose.Schema.Types.ObjectId,ref:'State',required:true}
    }
)
module.exports=mongoose.model('District',districtSchema)