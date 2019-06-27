const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let ProductsCategory  = mongoose.model("products_category", {
    _id: { type: Number },
    name: { type: String }
}, "products_category");

module.exports = { ProductsCategory };
