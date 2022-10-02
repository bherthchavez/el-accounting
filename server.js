require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
const http = require("http");
const { get, parseInt, replace } = require("lodash");

const sesion = require('express-session');
const passport =require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const path = require('path')
const app = express();
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(sesion({
    secret: "himawariuzumaki",
    saveUninitialized: true,
    resave: false
}));  
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use((req, res, next)=>{
    res.locals.user = req.session.user;
    next();
});

app.use((req, res, next)=>{
    res.locals.settingsAlert = req.session.settingsAlert;
    delete req.session.settingsAlert;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect("mongodb://localhost:27017/accountingDB", {useNewUrlParser: true});

mongoose.connect("mongodb+srv://admin-bherth:Test123@cluster0.hjeikps.mongodb.net/accountingDB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema ({
  name: String,
  userRole: String,
  email: String,
  created_at: Date,
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const user = new mongoose.model("user", userSchema);


passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//   let dateNow = new Date();
//     let name = "himawari";
//     let userRole = "Hokage";
//     let userEmail="b@g.com";
//     let username= "hima";
//     let password="@himauzumaki";
//     user.register({name: name, userRole: userRole, email: userEmail, created_at: dateNow, username: username},password, function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("success.");
//     }
//     });
  


// route prefix
app.use('', require('./routes/routes'));

app.get('/', (req, res)=>{
    res.json({message: "test on"});
})

 // Serrver setup -------------------------//

 let port = process.env.PORT;
 if (port == null || port == "") {
   port = 3000;
 }

app.listen(port, ()=>{
console.log("Server running on port: " + port);
});