const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
    quote:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    shownId:{
        type:Array,
    },
    shareCount:{
        type:Number,
    },
    shareType:{
        type:Array,
    }
},{timestamps:true})

module.exports = mongoose.model("Quote",quoteSchema);