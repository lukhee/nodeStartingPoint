const routes = require("express").Router()
const User = require("../models/userModel")
const usersController = require('../controllers/users')
const {body} = require('express-validator/check')

routes.get('/', usersController.getUser)

routes.post('/', [
body("email")
.isEmail()
.withMessage('reister with valid email sddress')
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
    .isLength({max: 4}),
body("name")
    .trim()
    .not().isEmpty()
], usersController.signUp)

module.exports = routes