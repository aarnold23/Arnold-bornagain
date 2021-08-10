const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
      pnumber :{
      type: String,
      trim: true
    
    },
    doa:{
        type: Date,

    },

    price: {
        type: Number,
        
        
    },
    washerFee:{
        type: Number
    },

    ctype:{
        type: String,
        trim: true
    },
    package:{
        type: String
        
    },
    wname :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wname",
    },

    
    });
    module.exports = mongoose.model('Customer',customerSchema );