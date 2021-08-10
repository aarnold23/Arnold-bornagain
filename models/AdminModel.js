//import mongoose and passportLocalMongoose.
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: "Please provide first name",
    },
    lastname:{
        type: String,
        required: "Please provide last name",
        trim: true,
    },
    username: {
        type: String,
        required: "Please provide username",
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        
    },
});
//add passportLocalMongoose  as a plugin to our adminSchema
adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);