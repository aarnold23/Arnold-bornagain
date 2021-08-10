const express = require("express");
const mongoose = require("mongoose");
const moment= require('moment');
const Customer= require("../models/Customermodels");
const Employee = require("../models/RegisterModels")
const Expense= require('../models/ExpenseModels');
const router = express.Router();





router.get('/payouts',async(req,res)=>{
// use moment to get the selected date
    let selectedDate= moment().format('YYYY-MM-DD')

//if query parameter is search date then let parameter of moment be req.query.searchdate
    if (req.query.searchdate)
       selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

//based on the selected date, query to get the count of the vehicles per washer
// & total payout per washer
    let washedVehicles = await Customer.aggregate(
        [{$match:{ doa: new Date(selectedDate) }},
        {$group:{_id: '$wname', count:{$sum:1}, totalPayout:{$sum: '$washerFee'}}},
        {$lookup:{from:'employees',localField:'_id', foreignField:'_id', as:'details'}}]
    )
    //get the total payout of each washer based o selected date
    let totalPayoutPerDay = await Customer.aggregate([
        { $match: { doa: new Date(selectedDate)}},
        { $group: { _id: '$doa', totalPayoutPerDay: { $sum: '$washerFee'}}}
        
       ])
       //console.log('this is my total payout', totalPayoutPerDay)
    res.render("car_washer_payouts" ,{employees: washedVehicles, title:"Lists of car washers",
        defaultDate: selectedDate , sumPayout: totalPayoutPerDay[0] })

})

router.get('/expenseReports', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all expenses on a day
        let expenseDetails = await Expense.find({ doe: selectedDate })

        // query for total expense on a day
        let totalExpense = await Expense.aggregate([
            { $match: { doe: new Date(selectedDate) } },
            { $group: { _id: '$doe', totalExpense: { $sum: '$amount' } } }
        ])

        res.render("expenseReports", {
            expenses: expenseDetails, total: totalExpense[0],
            title: "Expenses", defaultDate: selectedDate
        })
    } catch (err) {
        console.log(err)
        res.send('Failed toretrieve Expense details');
    }
})


router.get('/employeeDetails', async (req, res) => {
    try {
        // find all the data in the Employees collection
        let employeeDetails = await Employee.find();
        res.render('car_washer_details', { employees: employeeDetails, title: 'Employee Details' })
    } catch (err) {
        console.log(err)
        res.send('Failed to retrive employee details');
    }
})

router.get('/revenue', async (req, res) => {
    try {
        let selectedDate = moment().format('YYYY-MM-DD')
        if (req.query.searchdate)
            selectedDate = moment(req.query.searchdate).format('YYYY-MM-DD')

        // query for returning all data in the vehicle collection in one day

        let collectionDetails = await Customer.find({ doa: selectedDate })

        // query for total collections in a day
        let totalCollection = await Customer.aggregate([
            { $match: { doa: new Date(selectedDate) } },
            { $group: { _id: '$doa', totalCollection: { $sum: '$price' } } }
        ])

        res.render("revenueReport", {
            collections: collectionDetails, totalRevenue: totalCollection[0],
            title: "Collections", defaultDate: selectedDate
        })

    } catch (err) {
        console.log(err)
        res.send('Failed to retrive collections details');
    }
})

module.exports = router;