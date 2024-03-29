//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);