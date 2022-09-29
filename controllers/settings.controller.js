
const CostCenter = require('../models/CostCenter');
const ChartOfAccounts = require('../models/ChartOfAccount');
const Settings = require('../models/Settings');
const PurposeTransfer = require('../models/PurposeTransfer');

const fs = require('fs');
const path = require('path');

module.exports = {

//--------------------------------------------------------ACCOUNT LEDGER SETTINGS //
    viewChartAcc : (req, res) =>{
        if (req.isAuthenticated()){

            PurposeTransfer.find().exec((err,  purposeFoundItems)=>{

                if (err){

                    res.json({message: err.message});

                }else{

                    CostCenter.find().exec((err,  costFoundItems)=>{

                        if (err){

                            res.json({message: err.message});

                        }else{

                            ChartOfAccounts.find().exec((err, chartFoundItems)=>{

                                if (err){

                                    res.json({message: err.message});

                                }else{

                                    let nav = {
                                        title: "Settings",
                                        child: "Master"
                                    };

                                    res.render('account-ledger', {title: "Settings - Account Ledger",
                                    nav: nav,
                                    chartFoundItems: chartFoundItems, 
                                    purposeFoundItems:purposeFoundItems, 
                                    costFoundItems: costFoundItems, 
                                    });
                                }
                            });
                        }
                      });
                    }
             });

        }else{
            res.redirect("/sign-in");
        }
    },

    addChartAcc: (req, res)=>{
        if (req.isAuthenticated()){

            const cc = new ChartOfAccounts({
                name:  req.body.ledgerName,
                code: req.body.ledgerCode,
                created_by: req.user.name,
                updated_at: Date.now()
            });
            cc.save((err)=>{
                if(err){
                    res.json({message: err.message, type: 'danger'});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Account ledger added successfully!',
                    };
                    res.redirect('/master');
                }
            });

        }else{
            res.redirect("/sign-in");
        }   

    },

    updateChartAcc: (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id;

            ChartOfAccounts.findByIdAndUpdate(id, {
                name:  req.body.ledgerName,
                code:  req.body.ledgerCode,
                updated_at: Date.now()
                }, (err, result)=>{
                    if(err){
                        res.json({message: err.message, type: 'danger'});
                    }else{
                        req.session.message = {
                            type: 'success',
                            message: 'Account ledger updated successfully!'
                        };
                    
                        res.redirect('/master')
                    }
                });

        }else{
            res.redirect("/sign-in");
        } 
    },

    deleteChartAcc : (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id

            ChartOfAccounts.findByIdAndRemove(id, (err, result)=>{
                
                if(err){
                    res.json({message: err.message});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Account ledger deleted successfully!',
                    };
                    res.redirect('/master')
                }

            });

        }else{
            res.redirect("/sign-in");
        } 
    },
//-------------------------------------------------------- COST CENTER SETTINGS //
    viewCostCenter : (req, res) =>{
        if (req.isAuthenticated()){

            PurposeTransfer.find().exec((err,  purposeFoundItems)=>{

                if (err){

                    res.json({message: err.message});

                }else{

                    CostCenter.find().exec((err,  costFoundItems)=>{

                        if (err){

                            res.json({message: err.message});

                        }else{

                            ChartOfAccounts.find().exec((err, chartFoundItems)=>{

                                if (err){

                                    res.json({message: err.message});

                                }else{

                                    let nav = {
                                        title: "Settings",
                                        child: "Master"
                                    };

                                    res.render('cost-center', {title: "Settings - Cost Center",
                                    nav: nav,
                                    chartFoundItems: chartFoundItems, 
                                    purposeFoundItems:purposeFoundItems, 
                                    costFoundItems: costFoundItems, 
                                    });
                                }
                            });
                        }
                      });
                    }
             });

        }else{
            res.redirect("/sign-in");
        }
    },

    addCostCenter: (req, res)=>{
        if (req.isAuthenticated()){

            const cc = new CostCenter({
                cost_center:  req.body.costCenter,
                code: req.body.cCcode,
                created_by: req.user.name,
                updated_at: Date.now()
            });
            cc.save((err)=>{
                if(err){
                    res.json({message: err.message, type: 'danger'});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Cost center added successfully!',
                    };
                    res.redirect('/cost-center');
                }
            });

        }else{
            res.redirect("/sign-in");
        }   

    },

    updateCostCenter: (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id;

            CostCenter.findByIdAndUpdate(id, {
                cost_center:  req.body.costCenter,
                code:  req.body.cCcode,
                updated_at: Date.now()
                }, (err, result)=>{
                    if(err){
                        res.json({message: err.message, type: 'danger'});
                    }else{
                        req.session.message = {
                            type: 'success',
                            message: 'Cost center updated successfully!'
                        };
                    
                        res.redirect('/cost-center')
                    }
                });

        }else{
            res.redirect("/sign-in");
        } 
    },

    deleteCostCenter : (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id

            CostCenter.findByIdAndRemove(id, (err, result)=>{
                
                if(err){
                    res.json({message: err.message});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Cost center deleted successfully!',
                    };
                    res.redirect('/cost-center')
                }

            });

        }else{
            res.redirect("/sign-in");
        } 
    },
//-------------------------------------------------------- Purpose Transfer SETTINGS //
    viewPurpose : (req, res) =>{
        if (req.isAuthenticated()){

            PurposeTransfer.find().exec((err,  purposeFoundItems)=>{

                if (err){

                    res.json({message: err.message});

                }else{

                    CostCenter.find().exec((err,  costFoundItems)=>{

                        if (err){

                            res.json({message: err.message});

                        }else{

                            ChartOfAccounts.find().exec((err, chartFoundItems)=>{

                                if (err){

                                    res.json({message: err.message});

                                }else{

                                    let nav = {
                                        title: "Settings",
                                        child: "Master"
                                    };

                                    res.render('transfer-purpose', {title: "Settings - Transfer Purpose",
                                    nav: nav,
                                    chartFoundItems: chartFoundItems, 
                                    purposeFoundItems:purposeFoundItems, 
                                    costFoundItems: costFoundItems, 
                                    });
                                }
                            });
                        }
                      });
                    }
             });

        }else{
            res.redirect("/sign-in");
        }
    },

    addPurpose: (req, res)=>{
        if (req.isAuthenticated()){

            const purpose = new PurposeTransfer({
                purpose:  req.body.purpose,
                code: req.body.purposeCode,
                created_by: req.user.name,
                updated_at: Date.now()
            });
            purpose.save((err)=>{
                if(err){
                    res.json({message: err.message, type: 'danger'});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Transfer purpose added successfully!',
                    };
                    res.redirect('/purpose-transfer');
                }
            });

        }else{
            res.redirect("/sign-in");
        }   

    },

    updatePurpose: (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id;

            PurposeTransfer.findByIdAndUpdate(id, {
                purpose:  req.body.purpose,
                code:  req.body.purposeCode,
                updated_at: Date.now()
                }, (err, result)=>{
                    if(err){
                        res.json({message: err.message, type: 'danger'});
                    }else{
                        req.session.message = {
                            type: 'success',
                            message: 'Transfer purpose updated successfully!'
                        };
                    
                        res.redirect('/purpose-transfer')
                    }
                });

        }else{
            res.redirect("/sign-in");
        } 
    },

    deletePurpose : (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id

            PurposeTransfer.findByIdAndRemove(id, (err, result)=>{
                
                if(err){
                    res.json({message: err.message});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Transfer purpose deleted successfully!',
                    };
                    res.redirect('/purpose-transfer')
                }

            });

        }else{
            res.redirect("/sign-in");
        } 
    },
 //--------------------------------------------------------  SYSTEM SETTINGS //
    viewSysSettings : (req, res) =>{
        if (req.isAuthenticated()){

            // const settings1 = new Settings({
            //     name: "bill_settings",
            //     prefix: "#PUV/2022/",
            //     starting_no: "100",
            //     created_by: "Admin",
            //     created_at: Date.now(),
            //     updated_at: Date.now()
            //   });
              
            //   const settings2 = new Settings({
            //     name: "payment_voucher_settings",
            //     prefix: "#PAV/2022/",
            //     starting_no: "100",
            //     created_by: "Admin",
            //     created_at: Date.now(),
            //     updated_at: Date.now()
            //   });

            // const defaultSettings = [settings1,settings2];

           
          
                    Settings.findOne({name: "bill_settings"}, (err, billSetting)=>{
                        
                        if (err) {
                            res.json({message: err.message});
                        } else {

                            Settings.findOne({name: "payment_voucher_settings"}, (err, PAVSetting)=>{
                            
                                if (err) {
                                    res.json({message: err.message});
                                } else {
                                    let nav = {
                                        title: "Settings",
                                        child: "System Settings"
                                    };

                                    res.render('system-settings', {title: "Settings - System Settings",
                                    nav: nav,
                                    billSetting: billSetting,
                                    PAVSetting:PAVSetting, 
                                    alert: 0, 
                                    alertSetBill: 0, 
                                    alertSetPay: 0,
                                });

                                }
                            });
                        }
                    });
               

        }else{
            res.redirect("/sign-in");
        }
    }

}