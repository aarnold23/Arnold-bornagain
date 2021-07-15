const express = require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Register = require('../models/RegisterModels');
const CustomerReg= require('../models/Customermodels');
const Loginroutes= require('../models/Loginmodels');

router.get('/',(req,res)=>{
    res.render('zawashLogin')
});


router.get('/register',(req,res)=>{
    res.render('register')
});
router.get('/customerReg',(req,res)=>{
    res.render('customerReg')
});


router.post('/',(req,res)=>{
    
    console.log(req.body)
    
});


router.post('/register',(req,res)=>{
    
    console.log(req.body)
    const register= new Register(req.body);
    
    register.save()
    .then(() => { res.send('Thank you for your registration!'); })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');});
    
});
   router.post('/customerReg',(req,res)=>{
    
    console.log(req.body);
    const customerReg= new CustomerReg(req.body);
    
    customerReg.save()
    .then(() => { res.send('Thank you for your registration!'); })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.')});
    
});
    

module.exports= router;