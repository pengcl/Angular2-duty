var express = require('express');
var router = express.Router();
var WxSvc = require('../../utils/service/wx.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  WxSvc.getAccessToken().then(function (data) {
    res.render('wxApi', {
      title: 'wxApi',
      wxApi: data
    });
  });
  res.setHeader('cache-control', 'no-cache');
});

module.exports = router;
