var Users = require('../../utils/db/modules/users');//导入模型数据模块

var user = {};

user.find = function (id) {
  Users.findById(id, function (data) {
    console.log(data);
  })
};


module.exports = user;
