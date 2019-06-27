const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let CartItems  = mongoose.model("cart_items", {
    _id: { type: Number },
    name: { type: String },
    prod_id: { type: Number },
    quantity: { type: Number },
    overall_price: { type: Number },
    cart_id: { type: Number },
    image: { type: String }
}, "cart_items");

module.exports = { CartItems };
