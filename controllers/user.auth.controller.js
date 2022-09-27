const PaymentVoucher = require('../models/PaymentVoucher');
const CostCenter = require('../models/CostCenter');
const SupplierAccount = require('../models/SupplierAccount');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const passportLocalMongoose = require("passport-local-mongoose");
const passport =require("passport");


module.exports = {
   
 
  
     signIn: (req, res)=>{   

        res.render('sign-in', {
            title: "Sign In User",
            alert: 0

        })
        
    },

    checkUser: (req, res)=>{   

        const user = new User({
            username: req.body.username,
            password: req.body.password
          });
    
        req.login(user, function(err){
          if(err){
            console.log(err);
            
          }else{
            passport.authenticate("local", { failureRedirect: '/incorrect-user'})(req, res, function(){
              res.redirect("/");
            });
          
          }
        });
            
        },

        logoutUser: (req, res)=>{   

            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
              });
                
        },
        
        incorrectUser : (req, res)=>{
        
            res.render("sign-in", {title: "Incorrect User", alert: 1});
          
        }
}