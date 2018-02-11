var express = require('express');
var router = express.Router();
var config = require('../../config/config');
let {WxSvc} = require('../../utils/service/wx.js');

var mongoose = require('mongoose');
var Users = require('../../utils/db/modules/users');//导入模型数据模块

/* GET home page. */
router.get('/', function (req, res, next) {

  if (!req.query.code) {//没有code参数
    res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/wx/auth?callbackUrl=' + req.query.callbackUrl));
    res.statusCode = 301;
    res.end('');
  }

  if (req.query.code) {//如果有code参数
    WxSvc.OAuth.getAccessToken(req.query.code).then(function (data) {//获取网页授权access_token;
      if (data.access_token) {//获取网页授权access_token成功,目的是获取openid;
        var openid = data.openid;
        WxSvc.getAccessToken().then(function (data) { //获取基础access_token
          var access_token = data;
          WxSvc.getUserInfo(access_token.access_token, openid).then(function (data) {//获取微信用户信息
            Users.findByOpenid(openid, function (err, user) {//通过openid获取数据库用户信息
              if (err) {
                console.log(err);
              } else {
                if (!user) {//如果数据库不存在此openid的用户
                  var user = new Users({
                    mobile: '',
                    wx: data,
                    access_token: access_token
                  });

                  user.save(function (err, user) { //保存用户信息到数据库
                    console.log(user);
                    if (err) {
                      return;
                    } else {//微信信息插入成功
                      if (req.query.callbackUrl.indexOf('?') !== -1) {
                        res.location(req.query.callbackUrl + '&userId=' + user._id);
                      } else {
                        res.location(req.query.callbackUrl + '?userId=' + user._id);
                      }
                      res.statusCode = 301;
                      res.end('');
                    }
                  });
                } else {//如果数据库存在此openid的用户
                  if (req.query.callbackUrl.indexOf('?') !== -1) {
                    res.location(req.query.callbackUrl + '&userId=' + user._id);
                  } else {
                    res.location(req.query.callbackUrl + '?userId=' + user._id);
                  }
                  res.statusCode = 301;
                  res.end('');
                }
              }
            });
          });
        });

      } else {//获取access_token失败，重新获取code;
        res.location(WxSvc.OAuth.getCode(config.duty.webHost + '/api/wx/auth?callbackUrl=' + req.query.callbackUrl));
        res.statusCode = 301;
        res.end('');
      }
    });
  }
});

module.exports = router;
