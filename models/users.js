
const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

let Users  = mongoose.model("users", {
    _id: { type: Number },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String }
}, "users");

module.exports = { Users };
