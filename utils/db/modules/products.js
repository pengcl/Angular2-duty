var mongoose = require('mongoose');
var ProductsSchema = require('../schemas/products'); //拿到导出的数据集模块
var Products = mongoose.model('Products', ProductsSchema); // 编译生成Users 模型

module.exports = Products;
