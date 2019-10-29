const Product = require("../models/productModel")
const path = require("path")
const fs = require("fs")


// get all products
exports.getProducts = (req, res, next) => {  
    Product.find()
        .then(products => {
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

// update product
exports.updateProduct = (req, res, next)=>{
    const id = req.params.productId
    let imageURL
    Product.findById(id)
    .then(product=>{
        if(!product){
            let error = new Error("no product found")
            error.statusCode = 422
            throw (error)
        }
        if(req.file){
            clearImage(product.image)
            imageURL = req.file.path
            console.log("new image uploade")
        }else{
            imageURL = product.image
            console.log("old image url uploaded")
        }
        product.author = req.body.author || "lukman"
        product.title = req.body.title || "adjusted file"
        product.image = imageURL
        return product.save()
        .then(result=>{
            res.status(201).json(
                {
                    message: "product updated successfully",
                    data: result
                }
            )
        })
    })
    .catch(err=>{
        next(err)
    })
}

// delete product
exports.deleteProduct = (req, res, next)=>{
    let id = req.params.productId;
    Product.findById(id).then(product=>{
        console.log(product)
        if(!product){
            let error = new Error("no product found")
            error.statusCode = 422
            throw (error)
        }else if(product.image){
            clearImage(product.image)
        }
        return Product.findByIdAndDelete(product._id)
        .then(result=>{
            res.status(201).json({
                message: "product successfully deleted",
                data: result
            })
        })
    })
    .catch(err=>{
        console.log(err)
        next(err)
    })
}


//clear multiple images during update
let clearImage = filePath=>{
    let filepath = path.join(__dirname, '..', filePath)
    console.log(filepath)
    fs.unlink(filepath, err =>{
    })
}