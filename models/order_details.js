const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let OrderDetails  = mongoose.model("order_details", {
    _id: { type: Number },
    cart_id: { type: Number },
    finalprice: { type: Number },
    cust_id: { type: Number },
    shipping_city: { type: String },
    shipping_street: { type: String },
    shipping_date: { type: String },
    cart_date: { type: String },
    credit_4digits: { type: Number }
}, "order_details");

module.exports = { OrderDetails };
