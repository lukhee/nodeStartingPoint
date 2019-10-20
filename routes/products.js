const routes = require("express").Router()
const productsContoller = require("../controllers/products")

routes.get("/getAll", productsContoller.getProducts)

routes.get("/getById/:productId", productsContoller.getPoductByID)

routes.post("/createOne", productsContoller.postUserProducts)

module.exports = routes