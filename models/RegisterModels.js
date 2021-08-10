const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    username:{
    type: String,
    trim: true
    
},
    nin: {
        type:String,
        trim:true
        
    },
    residence:{
        type: String,
        trim: true
    },
    phonenumber:{
        type: Number,
        
    }
    
    });
    module.exports = mongoose.model('employee',registerSchema )