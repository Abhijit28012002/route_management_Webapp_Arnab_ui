const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema=new Schema(
    {
        statecode:{type:Number,unique:true,required:true},
        statename:{type:String,required:true}
    }
)
module.exports=mongoose.model('State',stateSchema)