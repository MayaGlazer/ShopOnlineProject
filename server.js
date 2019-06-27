const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser =  require('cookie-parser');
const router = require('./db');
const app = express();
const port = process.env.PORT || 3010;


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-allow-headers","origin, x-requested-with, content-type, accept");
    res.setHeader("Access-control-allow-methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(function(req, res, next) {
    console.log(req.url + " " + req.method);
    // console.log(process.env)
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


app.use('/api', router);

// app.get('/users/home', function(req, res) {
//     console.log(res.session);  
// });


app.listen(port, () => {
    console.log(port + ' is Connected')
})
