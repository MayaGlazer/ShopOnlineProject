const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let Products  = mongoose.model("products", {
    _id: { type: Number },
    name: { type: String },
    cat_id: { type: Number },
    price: { type: Number },
    image: { type: String }
}, "products");

module.exports = { Products };
