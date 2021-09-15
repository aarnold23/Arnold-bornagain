const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
      pnumber :{
      type: String,
      trim: true,
      required: "Please provide plate number",
          
    },
    doa:{
        type: Date,
        required: "Please provide date of arrival",

    },

    price: {
        type: Number,
        required: "Please provide price",
        
        
    },
    washerFee:{
        type: Number,
        required: "Please provide washer paycut",
    },

    ctype:{
        type: String,
        trim: true,
        required: "Please provide car type",
    },
    package:{
        type: String,
        required: "Please provide type of package",
        
    },
    wname :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wname",
        required: "Please provide washer name",
    },

    
    });
    module.exports = mongoose.model('Customer',customerSchema );