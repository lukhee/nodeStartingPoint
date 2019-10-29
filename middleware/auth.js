const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    let authAutorization = req.get('Authorization')
    if (!authAutorization) {
        let error = new Error("auth not found")
        error.statusCode = 401
        throw error
    }
    const token = authAutorization.split(' ')[1]
    if(!token){
        let error = new Error("token not found")
        error.statusCode = 401
        throw error
    }
    let decodeToken 
    try {
        decodeToken = jwt.verify(token, 'supersupersupersecretekey')
    } catch(err){
        throw(err)
    }
    req.userId = decodeToken.userId
    console.log(req.userId)

    next()
}