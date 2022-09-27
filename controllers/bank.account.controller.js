const BankAccount = require('../models/BankAccount');
const fs = require('fs');
const path = require('path');

module.exports = {
    addBankAcc : (req, res) =>{
        const bAcc = new bank_account({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename
        });
        bAcc.save((err)=>{
            if(err){
                res.json({message: err.message, type: 'danger'});
            }else{
                req.session.message = {
                    type: 'success',
                    message: 'User added successfully!',
                };
                res.redirect('/');
            }
        });
    },
    viewBankAcc: (req, res)=>{
        res.render('index', {title: "Home Page" })
        // bank_account.find().exec((err, users)=>{
        //     if(err){
        //         res.json({message: err.message});
        //     }else{
            
        //         res.render('index', {
        //             title: "Home Page",
        //             users: users
        //         })
        //     }
        // });
    },
    getEditBankAcc: (req, res) =>{
        let id = req.params.id;
        bank_account.findById(id, (err, user)=>{
            if(err){
                res.redirect('/');
            }else{
                if(user == null){
                    res.redirect('/');
                }else{
                    res.render('edit_user', {
                        title: "Edit User", 
                        user: user
                    });
                }
            }
        });
    },
    editBankAcc: (req, res)=>{
         let id = req.params.id;
         let new_image = '';
         

         if(req.file){
             new_image = req.file.filename;
             try{
                 fs.unlinkSync('./uploads/' + req.body.old_image);
             }catch (err){
                 console.log(err);
             }
         }else{
             new_image = req.body.old_image;
         }

         bank_account.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
         }, (err, result)=>{
            if(err){
                res.json({message: err.message, type: 'danger'});
            }else{
                req.session.message = {
                    type: 'success',
                    message: 'User updated successfully!'
                };
                res.redirect('/')
            }
         });
    },
    deleteBankAcc : (req, res)=>{
        let id = req.params.id
        bank_account.findByIdAndRemove(id, (err, result)=>{
            if(result.image !=""){
                try{
                    fs.unlinkSync('./uploads/' + result.image);
                }catch(err){
                    console.log(err);
                }
            }
            if(err){
                res.json({message: err.message});
            }else{
                req.session.message = {
                    type: 'info',
                    message: 'User deleted successfully!',
                };
                res.redirect('/')
            }

        })
    }
}