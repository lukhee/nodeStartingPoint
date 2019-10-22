const routes = require("express").Router()
const productsContoller = require("../controllers/products")

routes.get("/getAll", productsContoller.getProducts)

routes.get("/getById/:productId", productsContoller.getPoductByID)

routes.post("/createOne", productsContoller.postUserProducts)

routes.put("/updateOne/:productId", productsContoller.updateProduct)

routes.delete("/deleteOne/:productId", productsContoller.deleteProduct)

module.exports = routes