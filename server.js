require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
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
    secret: process.env.HIMA,
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

app.listen(port, function(){
console.log("Server running on port: " + port);
});