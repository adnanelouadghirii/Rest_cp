const  User = require("../models/User");
var CryptoJS = require("crypto-js");
const Joi = require("joi");


exports.createNewUser = (req, res, next) => {
    try{
        const schema =Joi.object({ Password : Joi.string().min(3).required()});


    const result = schema.validate({Password: req.body.Password})
    let {error} = result
    if (error){
        res.send(error)
        return;
    }

    var enc_psd = CryptoJS.AES.encrypt(req.body.Password , 'secret key').toString();   // Encryption
    let  newUser = new User ({UserName: req.body.UserName, Password: enc_psd});
    newUser.save((err, person) => {
    if (err) {
        res.send(err)
        return;

    }
        res.send(person)
    
    });
    }
    catch(error){
        return next(error)
    }
    };
exports.edit_by_id = (req, res, next) => {
    try{
        User.findOneAndUpdate({ _id: req.body.id}, {UserName: req.body.UserName}, {new: true}, (err, result)=> {
           
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }

      });
    }catch(error){
        return next(error)
    }
    
    
    };
exports.delete_by_id = (req, res, next) => {
    try{
        User.findOneAndDelete({ _id: req.body.id}, (err, result)=> {
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }

      });
    }catch(error){
        return next(error)
    }
    
    
    };
exports.getallusers = (req, res, next) => {
    try{
        User.find({}, (err, users)=> {
           res.send(users)
            

      });
    }catch(error){
        return next(error)
    }
    
    
    };