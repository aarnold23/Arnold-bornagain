const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    pname:{
    type: String,
    trim: true
    
},
    price: {
        type: Number,
        trim:true
        
    },
     ctype:{
        type: String,
        trim: true
    },
    package:{
        type: Number
        
    },
     wname :{
        type: String
    }
    
    });
    module.exports = mongoose.model('customerRegroutes',customerSchema );