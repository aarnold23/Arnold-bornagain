const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    UserId:{
    type: String,
    trim: true
    
},
    password: {
        type:String,
        trim:true
        
    }
});

module.exports = mongoose.model('Loginroutes',PostSchema )