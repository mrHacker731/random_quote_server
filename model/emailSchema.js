const mongoose = require('mongoose');

const mailSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
    },
    forgetpass:{
        type:Boolean
    },

},{timestamps:true});

module.exports = mongoose.model("Mail",mailSchema);