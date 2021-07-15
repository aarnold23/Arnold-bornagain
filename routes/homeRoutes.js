const express= require('express');
const router= express.Router();

router.use('/', (req,res) => {
    res.render('zawashHome',{ 
        title: 'HomePage'
    });
  }); 

module.exports= router;