const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const townSchema=new Schema(
    {
        towncode:{type:Number,unique:true,required:true},
        townname:{type:String,required:true},
        ismaintown:{type:Boolean,required:true, default:false},
        state:{type:mongoose.Schema.Types.ObjectId,ref:'State',required:true},
        district:{type:mongoose.Schema.Types.ObjectId,ref:'District',required:true}
    }
)
module.exports=mongoose.model('Town',townSchema)