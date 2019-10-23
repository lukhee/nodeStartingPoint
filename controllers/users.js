const User = require("../models/userModel")
const {validationResult} = require("express-validator")
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.signUp = (req, res, next) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        let error = new Error("validation failed")
        error.statusCode = 422
        error.data = errors.array()
        throw(error)
    }
    bcrypt.hash(req.body.password, saltRounds)
        .then(hashPassword => {
            let user = new User({
                name : req.body.name,
                email : req.body.email,
                password : hashPassword
            })
            return user.save()
    })
    .then(result=>{
        res.status(200).json({
            message: "user created successfully",
            userID : result._id
        })
    })
    .catch(err=>{
        next(err)
    })
}