var express = require('express');
var router = express.Router();

var Users = require('../../utils/db/modules/users');//导入模型数据模块

/* GET users listing. */
router.get('/find', function (req, res, next) {
  if (req.query.id) {
    Users.findById(req.query.id, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  } else {
    Users.findAll(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    })
  }
});

router.get('/login', function (req, res, next) {
  if (req.query.mobile) {
    Users.findByMobile(req.query.mobile, function (err, user) {//通过openid获取数据库用户信息
      if (err) {
        console.log(err);
      } else {
        if (!user) {//如果数据库不存在此mobile的用户
          var user = new Users({
            mobile: req.query.mobile,
            wx: {},
            access_token: {}
          });

          user.save(function (err, user) { //保存用户信息到数据库
            if (err) {
              return;
            } else {//user信息插入成功
              res.send(user);
            }
          });
        } else {//如果数据库存在此mobile的用户
          res.send(user);
        }
      }
    });
  } else {
    res.send(false);
  }
});

module.exports = router;
