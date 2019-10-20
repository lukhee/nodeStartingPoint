const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bagsshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => {
    console.log("db connected")
})
.catch(err => {
    console.log("connection not found")
})

module.exports = mongoose