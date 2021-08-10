const express = require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Customer= require('../models/Customermodels');
const Admin = require('../models/AdminModel');
const Expense = require('../models/ExpenseModels'); 
const Employee = require('../models/RegisterModels');
const { check, validationResult } = require('express-validator');

washPackages={
    smallCar:{washerFee: 3000, price: 10000},   
    mediumCar:{washerFee:4000, price:15000},
    fullWash:{washerFee:5000, price: 20000},
    bodaWash:{washerFee:1500, price:5000},
    engineWash:{washerFee:2000, price:10000}
}





router.get('/register',(req,res)=>{
    res.render('register', {title:"Employee Register", alert: req.query.alert})
});

router.post ('/register', [
    check('username')
      .isLength({ min: 1 }),
    check('nin')
      .isLength({ min: 1}),
    check('residence')
      .isLength({ min: 1 }),
    check('phonenumber')
      .isLength({ min: 1 }),
    check('Birth Date')
      .isLength({min:1})
      
  ],
  async(req,res)=>{
    
    try{
        const errors = validationResult(req);

        if (errors.isEmpty()) {
          res.send('Thank you for your registration!');
        } else {
          res.status(400).render('register?alert=error',{title:"Employee Register", 
          alert: req.query.alert,
          errors:error,
          data: req.body
          });
        }
     const register= new Employee(req.body);
     await register.save()
      res.redirect('register?alert=success')
    }
    catch (err) {
       res.status(400).render('register?alert=error',{title:"Employee Register", alert: req.query.alert})
       console.log(err)}
     })


    router.get('/customerReg',async(req,res)=>{
    let washerlist= await Employee.find();
    
    res.render('customerReg', { washers: washerlist,
        title: "Customer Register", alert: req.query.alert})
});

    router.post('/customerReg',async(req,res)=>{
    
    try{
    // combine the date and time
    let data = req.body
    let datetimeArrival = Date.parse(data.doa + 'T' + data.toa)
    data.datetimeArrival = datetimeArrival

    //derive the package price and the washer fee
    console.log("the package selected on the form")
    console.log(data.package)
    let packageDetails = washPackages[data.package]
    
    console.log('the package from the in memory database')
    console.log(packageDetails)

    data.price = packageDetails['price']
    data.washerFee = packageDetails['washerFee']


    const customer= new Customer(data);
    await customer.save()
    res.redirect('customerReg?alert=success')
    }
    catch (err) {
       res.status(400).render('customerReg',{title:"Customer Register", alert:"error"}) 
      console.log(err)}
    });

    router.get('/create',(req,res)=>{
        res.render('createAdmin')
    });
    router.post ('/create', async(req,res)=>{
    const admin = new Admin(req.body);
    await Admin.register(admin,req.body.password,(err)=>{
             if (err){
                return res.status(400).render('createAdmin', {title:"Create Admin", alert:'error'})
                 console.log(err)
             } 
             else {
                 res.redirect('/create')
             }
            })});


   

   router.get("/expenses", (req, res) => {
    res.render('expenses', { title: "Register Expenses", alert: req.query.alert })
})

router.post("/expenses", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save()
        res.redirect('expenses?alert=success')
    }
    catch (err) {
        res.status(400).render('expenses', { title: "Register Expenses", alert: 'error' })
        console.log(err)
    }
})
router.post('/delete-employee', async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})






















module.exports = router;