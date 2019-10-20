const express = require("express")
const mongoose = require('mongoose');
const multer = require("multer");
const uuidv4 = require("uuid/v4")
const path = require("path");
const bodyParser = require("body-parser");
const productRoute = require("./routes/products");
const URL = 'mongodb://localhost:27017/bagshop';
const PORT = 8080;

const app = express();

// image storage defination
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname)
    }
})
let fileFilter = (req, file, cb)=>{
    if(
        file.mimetype === "image/jpeg" || 
        file.mimetype === "image/png"  ||
        file.mimetype === "image/JPG"
    ){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(multer({storage : storage, fileFilter: fileFilter}).single("image")) //settung up image download middleware
app.use("/static", express.static('public')) //rendering static file
app.use("/images", express.static('images')) //rendering static file
app.use(bodyParser.urlencoded({ extended : false})) // for form data
app.use(bodyParser.json(path.join(__dirname, 'images')))

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-methods", " GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next()
});

app.use("/", productRoute )

app.use((error, req, res, next)=>{
    let status = error.statusCode || 500
    let message = error.message
    res.status(status).json({
        message: message
    })
})


// database connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(result=>{
    console.log("db connected")
})
.catch(err=>{
    console.log("connection not found")
})

app.listen(PORT, ()=>{
    console.log(`app listen at port ${PORT}`)
})