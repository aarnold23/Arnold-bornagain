//importing of dependencies
const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const moment= require('moment');
const passport = require('passport');
const register_routes= require('./routes/registerRoutes');
const reportRoutes= require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const Admin = require('./models/AdminModel');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUnintialized: false});
require('dotenv/config');




//instantions that enable us to use our imported dependencies

const app = express();
// const Mongostore= require('connect-mongo')(session);
//use the connect method of mongoose to help us connect to the mongodb database
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true,
     useUnifiedTopology: true});

//when connection happens log the message below
mongoose.connection
.on('open',()=>{
  console.log('Mongoose connection open')
});
mongoose.connection
.on('error',(err)=>{
  console.log(`Connection error: ${err.message}`)
});

//configurations 
app.locals.moment= moment;
app.set('view engine', 'pug');
app.set('views', 'views'); 
app.use(express.static(path.join(__dirname,'public')));

//session setup
//const sessionStore = new MongoStore({mongooseConnection: mongoose.connection, collection: admin})

//middleware
app.use(express.urlencoded({extended: true}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
//passport middleware
passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

//custom middleware that ensure that checks at every route if the user is logged in.
 var loginChecker = function (req,res,next) {
  if(req.path != '/' && !req.session.user) {
     res.redirect('/')
   }
   
   next() };
 app.use(loginChecker);

    

//routes
 app.use('/',authRoutes);
 app.use('/',register_routes);
 app.use('/',reportRoutes);
 app.get('/home', (req,res) => {
  res.sendFile('views/index.html',{ 
    root:__dirname
  });
}); 


// error message
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.')
});


// start server
app.listen(3100, ()=> {console.log('Example app listening on port 3100!')});

let checker = new loginChecker

module.exports = checker;

