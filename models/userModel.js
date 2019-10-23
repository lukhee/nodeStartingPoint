//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);