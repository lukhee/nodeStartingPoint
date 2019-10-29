const routes = require("express").Router()
const User = require("../models/userModel")
const usersController = require('../controllers/users')
const {body} = require('express-validator/check')

routes.post('/createUser', [
body("email")
.isEmail()
.withMessage('reister with valid email address')
.custom((value, {req})=>{
    return User.findOne({email: value})
    .then(userFound =>{
        if(userFound){
            return Promise.reject("email already exist")
        }
    })
})
.normalizeEmail(),
body("password")
    .trim()
    .isLength({min: 4}),
body("name")
    .trim()
    .not().isEmpty()
], usersController.signUp)

routes.get("/getAllUsers", usersController.getAllUsers)

routes.get("/login", usersController.loginUser)

module.exports = routes