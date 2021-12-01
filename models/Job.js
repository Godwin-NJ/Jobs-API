const mongoose = require('mongoose')

const { Schema } = mongoose;

const JobSchema = new Schema({
    company:{
        type: String,
        required:[true,"Please provide company name"],
        maxLength:50
    },
    Position:{
        type: String,
        required:[true,"Please provide position"],
        maxLength:100
    },
    Status:{
        type: String,
        enum:["interview","declined","pending"],
        default:"pending"
    },
    CreatedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"Please provide user"]
    }
},{timestamps:true})


module.exports = mongoose.model('Job',JobSchema)



