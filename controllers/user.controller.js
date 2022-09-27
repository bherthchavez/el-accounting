const User = require('../models/User');
const fs = require('fs');
const path = require('path');

module.exports = {
    addUser : (req, res) =>{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename
        });
        user.save((err)=>{
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
    viewUser: (req, res)=>{
        User.find().exec((err, users)=>{
            if(err){
                res.json({message: err.message});
            }else{
            
                res.render('index', {
                    title: "Home Page",
                    users: users
                })
            }
        });
    },
    getEditUser: (req, res) =>{
        let id = req.params.id;
        User.findById(id, (err, user)=>{
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
    editUser: (req, res)=>{
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

         User.findByIdAndUpdate(id, {
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

    deleteUser : (req, res)=>{
        let id = req.params.id
        User.findByIdAndRemove(id, (err, result)=>{
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