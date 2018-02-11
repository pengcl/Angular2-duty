var express = require('express');
var router = express.Router();
var request = require('request');
var {ProductSvc} = require('../../utils/service/product');
var Products = require('../../utils/db/modules/products');//导入模型数据模块

router.get('/grabbing', function (req, res, next) {
  ProductSvc.grabbingProducts().then(function (data) {
    //res.send(data);
  });
});

router.get('/find', function (req, res, next) {
  if (req.query.id) {
    Products.findById(req.query.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  } else {
    Products.findAll(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data.length);
        res.send(data);
      }
    })
  }
});

module.exports = router;
