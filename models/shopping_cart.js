const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let ShoppingCart  = mongoose.model("shopping_cart", {
    _id: { type: Number },
    cust_id: { type: Number },
    date: { type: String }, //new Date().toLocaleString()
    active: {type: Boolean}
}, "shopping_cart");

module.exports = { ShoppingCart };
