var mongoose = require('mongoose');
//申明一个mongoons对象
var ProductsSchema = new mongoose.Schema({
  title: String,
  squares: Array,
  opens: Array,
  industrys: Array,
  payTypes: Array,
  litPic: String,
  images: Array,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
    publicAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//每次执行都会调用,时间更新操作
ProductsSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.publicAt = this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.publicAt = this.meta.updateAt = Date.now();
  }
  next();
});

//查询的静态方法
ProductsSchema.statics = {
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByTitle: function (title, cb) { //根据id查询单条数据
    return this.findOne({title: title}).exec(cb)
  }
};
//暴露出去的方法
module.exports = ProductsSchema;
