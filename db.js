const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ShopOnline');
var db = mongoose.connection;
let { CartItems } = require('./models/cart_items.js');
let { OrderDetails } = require('./models/order_details');
let { ProductsCategory } = require('./models/products_category');
let { Products } = require('./models/products');
let { ShoppingCart } = require('./models/shopping_cart');
let { Users } = require('./models/users');
var router = express.Router();
const sha1 = require('js-sha1');

db.on('error', console.log.bind(console, 'connection refused !!!'));
db.once('open', console.log.bind(console, 'connection success !!!'));

// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
var ID = mongoose.Types.ObjectId;

// router.get('/test/:id', (req, res) => { // Login
//     var test = req.params.id;
//     var first = sha1(test);
//     console.log('before: '+first);
//     var hash = sha1.create();
//     console.log('after: '+hash);
//     hash.update('Message to hash');
//     res.status(200).send(first);
//     // Users.findById(req.params.userid, (err, user) => {
//     //     console.log("that is error: " + err);
//     //     console.log("that is user: " + user);
//     //     res.status(200).json(user);
//     // })
// });

// Users Handle
router.get('/users', (req, res) => { // Get All Users
    Users.find({}, (err, allusers) => {
        console.log(allusers);
        res.json(allusers);
    })
});

router.get('/users/:userid', (req, res) => { // Get user by id
    Users.findById(req.params.userid, (err, user) => {
        console.log("that is error: " + err);
        console.log("that is user: " + user);
        res.status(200).json(user);
    })
});
router.post('/users/login', (req, res) => { // Login
    let un = req.body.email;
    let pw = sha1(req.body.password);
    console.log("un " + un);
    console.log("pw " + pw);
    Users.findOne({ email: un, password: pw }, (err, user) => {
        // console.log("that is error: " + err);
        // console.log("that is user: " + user.firstname);
        if (err || !user) {
            res.status(400).json({
                success: false,
                message: "Incorrect details"
            })
        } else {
            res.status(200).json({
                success: true,
                username: user.firstname,
                userid: user._id,
                userRole: user.role
            })
        }
        // res.status(200).json(user);
    })
});

router.post('/users', (req, res) => { // Sign Up
    console.log('request: ' + req.body.name);
    let hashedpw = sha1(req.body.password);
    let newuser = new Users({
        "_id": req.body._id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "password": hashedpw,
        "role": req.body.role
    });
    console.log('NEWUSER: ' + newuser)
    newuser.save()
        .then(item => {
            console.log('item: ' + item);
            res.status(200).send("item saved to db");
        })
        .catch(err => {
            res.status(404).send(err);
        });

});

router.get('/users/count', (req, res) => { // Count all Users
    Users.countDocuments({}, function (err, count) {
        console.log(count);
        res.status(200).json(count);
    });
});

// Products Handle
router.get('/products', (req, res) => { // Get All products
    Products.find({}, (err, allproducts) => {
        console.log(allproducts);
        res.json(allproducts);
    })
});

router.get('/products/search/:str', (req, res) => { // Get All Cart Items by cart id (My cart)
    let term = req.params.str;
    Products.find({ "name": {$regex: term , $options: 'i'}}, (err, fproducts) => {
        console.log(fproducts);
        res.json(fproducts);
    })
})

router.get('/products/count', (req, res) => { // Sum of all products
    Products.countDocuments({}, function (err, count) {
        console.log(count);
        res.status(200).json(count);
    });
});

router.post('/products', (req, res) => { // New Product
    console.log('request: ' + req.body.name);
    let newproduct = new Products({
        "_id": req.body._id,
        "name": req.body.name,
        "cat_id": req.body.cat_id,
        "price": req.body.price,
        "image": req.body.image
    });
    // let newtask = new Tasks(req.body);
    console.log('NEWUSER: ' + newproduct)
    newproduct.save()
        .then(item => {
            console.log('item: ' + item);
            res.status(200).send("item saved to db");
        })
        .catch(err => {
            res.status(404).send(err);
        });

});

router.put('/products/:prodid', (req, res) => { // Update Product
    Products.findById(req.params.prodid, (err, product) => {
        console.log("that is error: " + err);
        console.log("that is task: " + product);
        //res.status(200).json(product);
        //console.log('request: ' + req.body.name);
        product.name = req.body.name;
        console.log("that is putname: " + req.body.name);
        product.cat_id = req.body.cat_id;
        console.log("that is putcatid: " + req.body.name);
        product.price = req.body.price;
        console.log("that is putprice: " + req.body.name);
        // product.image = req.body.image;
        // let newtask = new Tasks(req.body);
        product.save()
            .then(item => {
                console.log('item: ' + item);
                res.status(200).send("product updated");
            })
            .catch(err => {
                res.status(404).send(err);
            });
    })
});

router.get('/products/:prodid', (req, res) => { // Get Product by id
    Products.findById(req.params.prodid, (err, product) => {
        console.log("that is error: " + err);
        console.log("that is task: " + product);
        res.status(200).json(product);
    })
})

router.get('/products/category/:catid', (req, res) => { // Get Products by Cat Id
    let catid = req.params.catid;
    Products.find({ "cat_id": catid }, (err, products) => {
        console.log("that is error: " + err)
        console.log("that are products: " + products)
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(products);
        }
    })
});

//Products Category Handle
router.get('/productscategory', (req, res) => { // Get All Product Categories
    ProductsCategory.find({}, (err, allcategories) => {
        console.log(allcategories);
        res.json(allcategories);
    })
});


// ShoppingCart Handle
router.get('/shoppingcart/all', (req, res) => { // Get All Users
    ShoppingCart.find({}, (err, allcarts) => {
        console.log(allcarts);
        res.json(allcarts);
    })
});

router.put('/shoppingcart/:cartid', (req, res) => { // Update Product
    ShoppingCart.findById(req.params.cartid, (err, cart) => {
        console.log("that is error: " + err);
        console.log("that is task: " + cart);
        console.log("that is active: " + req.body.active);
        //res.status(200).json(product);
        //console.log('request: ' + req.body.name);
        cart.active = req.body.active;
        // let newtask = new Tasks(req.body);
        cart.save()
            .then(item => {
                console.log('item: ' + item);
                res.status(200).json("cart updated");
            })
            .catch(err => {
                res.status(404).send(err);
            });
    })
});

router.get('/shoppingcart/:custid', (req, res) => { // Get Shopping Cart by Customer Id
    let custid = req.params.custid;
    ShoppingCart.find({ "cust_id": custid }, (err, cart) => {
        console.log("that is error: " + err)
        console.log("that is task: " + cart)
        let errorstatus = false;
        if (err) {
            res.status(500).send(err);
        }
        if (!cart) {
            res.status(404).json(errorstatus)
        } else {
            cart.forEach(cart => {
                if (cart.active == true) {
                    console.log(cart._id);
                    res.status(200).json(cart);
                }
            })
        }
    })
});

router.post('/shoppingcart', (req, res) => { // Start Shopping
    let newcart = new ShoppingCart({
        "_id": req.body._id,
        "cust_id": req.body.cust_id,
        "date": req.body.date,
        "active": true
    });
    // let newtask = new Tasks(req.body);
    console.log('NEWCART: ' + newcart)
    newcart.save()
        .then(item => {
            console.log('item: ' + item);
            res.status(200).send("item saved to db");
        })
        .catch(err => {
            res.status(404).send(err);
        });
});


// CartItem Handle
router.get('/cartitems/mycart/:cart_id', (req, res) => { // Get All Cart Items by cart id (My cart)
    let cartid = req.params.cart_id;
    CartItems.find({ "cart_id": cartid }, (err, allitems) => {
        console.log(allitems);
        res.json(allitems);
    })
})

router.get('/cartitems/search/:str', (req, res) => { // Get All Cart Items by cart id (My cart)
    let term = req.params.str;
    CartItems.find({ "name": {$regex: term , $options: 'i'}}, (err, Fitems) => {
        console.log(Fitems);
        res.json(Fitems);
    })
})

router.post('/cartitems', (req, res) => { // Add to Cart
    let newCartItem = new CartItems({
        "_id": req.body._id,
        "name": req.body.name,
        "prod_id": req.body.prod_id,
        "quantity": req.body.quantity,
        "overall_price": req.body.overall_price,
        "cart_id": req.body.cart_id,
        "image": req.body.image
    });
    console.log('NEWCARTITEM: ' + newCartItem)
    newCartItem.save()
        .then(item => {
            console.log('item: ' + item);
            res.status(200).send("item saved to db");
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.put('/cartitems/:itemid', (req, res) => { // Update Cart Item 
    CartItems.findById(req.params.itemid, (err, cartitem) => {
        console.log("that is error: " + err);
        console.log("that is task: " + cartitem);
        //res.status(200).json(product);
        //console.log('request: ' + req.body.name);
        cartitem.quantity = req.body.quantity;
        cartitem.overall_price = req.body.overall_price,
            // let newtask = new Tasks(req.body);
            cartitem.save()
                .then(item => {
                    console.log('item: ' + item);
                    res.status(200).send("cart item updated");
                })
                .catch(err => {
                    res.status(404).send(err);
                });
    })
});

router.get('/cartitems/sum/:cart_id', (req, res) => {// Total Price (of shop cart)
    let cartid = parseInt(req.params.cart_id);
    CartItems.aggregate([
        { $match: { "cart_id": cartid } },
        {
            $group: {
                _id: null,
                count: {
                    $sum: "$overall_price"
                }
            }
        }
    ], function (err, overall_price) {
        if (err) res.status(404).send(err);
        let result = overall_price[0].count;
        console.log(overall_price[0].count);
        res.status(200).json(result);
    });
});

// router.delete('/cartitems/delete/:itemid', (req, res) => {
//     CartItems.remove({
//         _id: req.params.itemid
//     }, function(err, cartitem) {
//         if (err) res.send(err);
//             console.log("that is error: " + err)
//             console.log("that is task: " + cartitem._id)
//         res.json({ message: 'Successfully deleted' });
//     });
// })
router.get('/cartitems/delete/:itemid', (req, res) => { // Remove Cart Item from cart
    CartItems.findById(req.params.itemid, (err, cartitem) => {
        console.log("that is error: " + err)
        console.log("that is task: " + cartitem)
        cartitem.remove((err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json('removed');
            }
        })
    })
})
router.get('/cartitems/delete/all/:cart_id', (req, res) => { // Delete all Cart Items
    let cartid = req.params.cart_id;
    CartItems.find({ "cart_id": cartid }, (err, allitems) => {
        console.log(allitems);
        res.json(allitems);
    })
    allitems.remove((err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send('removed');
        }
    })
})

//Order Details Handle

router.post('/orderdetails', (req, res) => { // Finish Order
    let newOrderDetails = new OrderDetails({
        "_id": req.body._id,
        "cart_id": req.body.cart_id,
        "finalprice": req.body.finalprice,
        "cust_id": req.body.cust_id,
        "shipping_city": req.body.shipping_city,
        "shipping_street": req.body.shipping_street,
        "shipping_date": req.body.shipping_date,
        "cart_date": req.body.cart_date,
        "credit_4digits": req.body.credit_4digits
    });
    // let newtask = new Tasks(req.body);
    console.log('NEWORDERDETAILS: ' + newOrderDetails)
    newOrderDetails.save()
        .then(item => {
            console.log('item: ' + item);
            res.status(200).json(newOrderDetails);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get('/orderdetails/count', (req, res) => { // Count all Orders
    OrderDetails.countDocuments({}, function (err, count) {
        console.log(count);
        res.status(200).json(count);
    });
});

router.get('/orderdetails/datearray', (req, res) => {// Total Price (of shop cart)
    let datearray = [];
    OrderDetails.find({}, (err, allitems) => {
        console.log(allitems);
        allitems.forEach(element => {
            console.log(element)
            datearray.push(element.shipping_date)
        });
        res.status(200).json(datearray);
    })
});

module.exports = router;