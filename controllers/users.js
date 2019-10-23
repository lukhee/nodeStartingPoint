const User = require("../models/userModel")
const {validationResult} = require("express-validator")


exports.getUser = (req, res, next)=>{
    res.json({
        message : "user found"
    })
}

exports.signUp = (req, res, next) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        let error = new Error("validation failed")
        error.statusCode = 422
        error.data = errors.array()
        throw(error)
    }
    let user = new User({
        name: "balogun lukman",
        email: "o.balogun@ymail.com",
        password: "password"
    })
    user.save()
    .then()
    .catch(err=>{
        next(err)
    })
    res.json({
        message: "user found"
    })
}