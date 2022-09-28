const SupplierAccount = require('../models/SupplierAccount');
const ChartOfAccount = require('../models/ChartOfAccount');
const CostCenter = require('../models/CostCenter');
const Settings = require('../models/Settings');
const fs = require('fs');
const path = require('path');

module.exports = {

    addSuppAcc : (req, res) =>{
        if (req.isAuthenticated()){

                const openingBalance = + (req.body.openingBalance).split(',').join('');;

                const sAcc = new SupplierAccount({
                    supplier_name: req.body.supplierName,
                    a_name: req.body.arabicName,
                    contact_person: req.body.contactPerson,
                    email: req.body.supplierEmail,
                    address: req.body.address,
                    opening_balance: openingBalance,
                    beneficiary_name: req.body.bName,
                    beneficiary_address: req.body.bAddress,
                    bank_name: req.body.bBankName,
                    iban_no: req.body.ibanNo,
                    swift_code: req.body.swiftCode,
                    billed: 0,
                    paid: 0,
                    balance_amount: 0,
                    active_status: parseInt(req.body.status),
                    created_bills: 0,
                    created_by: req.user.name,
                    updated_at: Date.now()
                });
                sAcc.save((err)=>{
                    if(err){
                        res.json({message: err.message, type: 'danger'});
                    }else{
                        req.session.message = {
                            type: 'success',
                            message: 'Supplier account added successfully!',
                        };
                        res.redirect('/supplier-accounts');
                    }
                });

        }else{
            res.redirect("/sign-in");
        }
    },

    viewSuppAcc: (req, res)=>{
        if (req.isAuthenticated()){

            SupplierAccount.find().exec((err, accounts)=>{
                    if(err){
                        res.json({message: err.message});
                    }else{

                        let nav = {
                            title: "Accounts",
                            child: "Suppliers"
                        };
                    
                        res.render('supplier-accounts', {
                            title: "Supplier Accounts",
                            supplierAccount: accounts,
                            nav: nav
                        })
                    }
                });

        }else{
            res.redirect("/sign-in");
        }   

    },

    updateSuppAcc: (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id;

            const balanceAmount = + (req.body.openingBalance).split(',').join('');

            SupplierAccount.findByIdAndUpdate(id, {
                supplier_name:  req.body.supplierName,
                a_name:  req.body.arabicName,
                contact_person: req.body.contactPerson, 
                email:  req.body.email,
                address: req.body.address,
                opening_balance: balanceAmount,
                beneficiary_name: req.body.bName,
                beneficiary_address: req.body.bAddress,
                bank_name: req.body.bBankName,
                iban_no: req.body.ibanNo,
                swift_code: req.body.swiftCode,
                active_status: parseInt(req.body.status),
                updated_at: Date.now()
            }, (err, result)=>{
                if(err){
                    res.json({message: err.message, type: 'danger'});
                }else{
                    req.session.message = {
                        type: 'success',
                        message: 'Supplier account updated successfully!'
                    };
                
                    res.redirect('/supplier-accounts')
                }
            });

        }else{
            res.redirect("/sign-in");
        } 
    },

    deleteSuppAcc : (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id
            SupplierAccount.findByIdAndRemove(id, (err, result)=>{
                
                if(err){
                    res.json({message: err.message});
                }else{
                    req.session.message = {
                        type: 'info',
                        message: 'Supplier account deleted successfully!',
                    };
                    res.redirect('/supplier-accounts')
                }

            });

        }else{
            res.redirect("/sign-in");
        } 
    },

    cBillSuppAcc : (req, res)=>{
        if (req.isAuthenticated()){

            let id = req.params.id

            ChartOfAccount.find().exec((err, chartOfAccount)=>{
                if(err){
                console.log(err);
                }else{
                
                    CostCenter.find().exec((err, costCenter)=>{
                    if (err){
                    console.log(err);
                    }else{

                        SupplierAccount.findById(id, (err, foundItem)=>{
                            if (err){
                            console.log(err);
                            }else{

                                SupplierAccount.find().exec((err, foundSupplier)=>{
                                
                                Settings.findOne({name: "bill_settings"}, (err, billSetting)=>{
                                    if (err) {
                                    console.log(err);
                                    }else{
                                    let puvno = billSetting.prefix + billSetting.starting_no;
                                    let nav = {
                                        title: "Accounts",
                                        child: "Suppliers"
                                    };

                                    res.render('create-purchase-bill', {title: "Create Supplier Bill",
                                        nav: nav,
                                        foundSupplier:foundSupplier, 
                                        puvno: puvno, 
                                        chartAccounts: chartOfAccount, 
                                        costCenter: costCenter,
                                        accountID:foundItem._id,
                                        supplierName: foundItem.supplier_name, 
                                        aName: foundItem.a_name, 
                                       
                                         });
                                    }
                                
                                });
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

    supplierBill : (req, res)=>{
        if (req.isAuthenticated()){

            res.redirect('/supplier-accounts')

        }else{
            res.redirect("/sign-in");
        } 
    }
}