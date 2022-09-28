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
    
        req.login(user, (err) =>{
          if(err){
            console.log(err);
            
          }else{
            req.session.message = {
              message: "Incorrect login credential",
              type: "warning"
          };

            passport.authenticate("local", { failureRedirect: '/sign-in'})(req, res, ()=>{
            
              req.session.user = {
                userName: req.user.name, 
                userRole: req.user.userRole 
            };
              res.redirect("/");
            });
          
          }
        });
            
        },

        logoutUser: (req, res)=>{   

            req.logout((err) =>{
                if (err) { return next(err); }
                res.redirect('/');
              });
                
        },
        
}