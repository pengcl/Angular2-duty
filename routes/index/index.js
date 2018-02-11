var express = require('express');
var router = express.Router();
let {ProductSvc} = require('../../utils/service/product.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    var products = [];

    ProductSvc.getProducts().then(function (data) {
        products = data;
        res.render('index', {
            title: 'Hello',
            products: products
        });
    });
    res.setHeader('cache-control', 'no-cache');
});

module.exports = router;
