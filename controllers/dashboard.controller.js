const PaymentVoucher = require('../models/PaymentVoucher');
const CostCenter = require('../models/CostCenter');
const SupplierAccount = require('../models/SupplierAccount');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const passportLocalMongoose = require("passport-local-mongoose");
const passport =require("passport");

module.exports = {
  
    viewDashboard: (req, res)=>{

     if (req.isAuthenticated()){

        PaymentVoucher.find().sort({created_at:-1}).exec( function(err, foundItem){
            if (err){
              console.log(err);
            }else{
      
                CostCenter.aggregate([
                {
                  "$lookup": {
                    "from": "bill_items",
                    "localField": "cost_center",
                    "foreignField": "cost_center",
                    "as": "bill_items"
                   }
                },
                
                {
                  "$project": {
                    "cost_center":   1,
                       "date": "$bill_items.inv_date",
                       "total": "$bill_items.sub_total",
                    "subTotal": { "$sum": "$bill_items.sub_total"
                    },
                   
                  }
                },
                { "$sort": { "subTotal": -1 } }
               
              ], function(errCc, foundcC){
                if(errCc){
                  console.log(errCc);
                }else{
      
                    SupplierAccount.find({}, function(errbill, suppFound){
                        if(err){
                          console.log(errbill)
                        }else{
      
                            SupplierAccount.find({created_bills:{ $gte: 1 } }, function(errpay, suppPay){
                            if(err){
                              console.log(errpay)
                            }else{
                             
                                res.render('index',{title: "EL - Accounting - Dashboard", 
                                suppPay: suppPay, 
                                suppFound:suppFound,
                                foundcC:foundcC, 
                                voucherItems: foundItem, 
                                userName: req.user.name, 
                                userRole: req.user.userRole });
                               
                              }
                            })
                        }
                      })
                   }
              })
      
            }
            
          });
  
        }else{
            res.redirect("/sign-in");
        }
    
    }
}