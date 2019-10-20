const Product = require("../models/productModel")


// get all products
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products)
            res.status(200).json({
                message: "get products is successfull",
                data: {
                    products: products
                }
            })
        })
        .catch(err => {
            console.log(err)
            if (!err.statusCode) {
                err.status = 500
            }
            next(er)
        })
}

// get product by ID
exports.getPoductByID = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .then(product => {
            if (!product) {
                console.log("product not found")
                let error = new Error("product not found")
                error.status = 302
                throw (error)
            }
            console.log(product)
            res.status(200).json({
                message: "products found successfully",
                data: {
                    product: product
                }
            })
        })
        .catch(err => {
            console.log(err)
            if (!err.statusCode) {
                err.status = 500
            }
            next(err)
        })
}


// create product
exports.postUserProducts = (req, res, next) => {
    if(!req.file){
        let error = new Error("no image found")
        error.statusCode = 422
        throw(error)
    }
    let items = {
        title: req.body.title || "Image testing",
        author: req.body.author || "Balogun Lukman",
        image: req.file.path
    }
    const product = new Product(items)
    product.save()
        .then(result => {
            res.status(201).json({
                message: "data created successfully",
                data: result
            })
        })
        .catch(err => {
            console.log(err)
            err.statusCode = 500
            next(err)
        })
}