const routes = require("express").Router()
const isAuth = require('../middleware/auth')
const productsContoller = require("../controllers/products")

routes.get("/getAll", isAuth, productsContoller.getProducts)

routes.get("/getById/:productId", productsContoller.getPoductByID)

routes.post("/createOne", isAuth,  productsContoller.postUserProducts)

routes.put("/updateOne/:productId", productsContoller.updateProduct)

routes.delete("/deleteOne/:productId", productsContoller.deleteProduct)

module.exports = routes