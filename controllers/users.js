const User = require("../models/userModel")
const {validationResult} = require("express-validator")
const bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken")
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

exports.getAllUsers = (req, res, next) => {
   User.find()
   .then(users=>{
       res.status(200).json({
           message: "users found",
           data: users
       })
       .catch(err=>{
           next(err)
       })
   })
}

exports.loginUser = (req, res, next)=>{
    let loadedUser
    let email = req.body.email
    let password = req.body.password
    User.findOne({email: email})
    .then(user=>{
        if(!user){
            let error = new Error
            error.statusCode = 401
            error.message = "email doent matched"
            throw error
        }
        loadedUser = user
        return bcrypt.compare(password, user.password)
    })
    .then(passwodIsMatch=>{
        if (!passwodIsMatch) {
            let error = new Error
            error.statusCode = 401
            error.message = "password doent matched"
            throw error
        }
        let token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            "supersupersupersecretekey",
            {
                expiresIn: "1h"
            }
        )
        res.status(200).json({
            message : "user login",
            token : token,
            userId : loadedUser._id.toString()
        })

    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}