const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    loginTime:{
        type:Array,
    },
    quoteList:{
        type:Array,
    }

},{timestamps:true})

module.exports = mongoose.model("User",userSchema);