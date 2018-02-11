var request = require('request');
var Q = require('q');
var fs = require('fs');
var cheerio = require('cheerio');
var ProductSvc = {};

var Products = require('../../utils/db/modules/products');//导入模型数据模块

function dataParse(body, page) {

  var $ = cheerio.load(body);

  var items = $('.pro_main').children('.pd_list_dl');

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var href = $(item).find('dt a').attr('href');
    var litPic = $(item).find('dt a').find('img').attr('src');
    request(href, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var _$ = cheerio.load(body);
        var title = _$('h4.corange').text();
        var $attrs = _$('.attrs_ul').children('li');
        var $images = _$('.proinfo').find('img');
        var $squares = _$($attrs).eq(0).find('.cur');
        const squares = [];
        for (var j = 0; j < $squares.length; j++) {
          squares.push(($squares.eq(j).text()).replace(/㎡/gi, ''));
        }
        var $opens = _$($attrs).eq(1).find('.cur');
        const opens = [];
        for (var k = 0; k < $opens.length; k++) {
          opens.push($opens.eq(k).text());
        }
        var $industrys = _$($attrs).eq(2).find('.cur');
        const industrys = [];
        for (var v = 0; v < $industrys.length; v++) {
          industrys.push($industrys.eq(v).text());
        }
        var $payTypes = _$($attrs).eq(3).find('.cur');
        const payTypes = [];
        for (var m = 0; m < $payTypes.length; m++) {
          payTypes.push($payTypes.eq(m).text());
        }

        const images = [];
        for (var n = 0; n < $images.length; n++) {
          images.push($images.eq(n).attr('src'));
        }

        Products.findByTitle(title, function (err, product) {//通过openid获取数据库用户信息
          if (err) {
            console.log(err);
            if (i === items.length) {
              return err;
            }
          } else {
            if (!product) {//如果数据库不存在此product
              var product = new Products({
                title: title,
                squares: squares,
                opens: opens,
                industrys: industrys,
                payTypes: payTypes,
                litPic: litPic,
                images: images
              });

              product.save(function (err, user) { //保存用户信息到数据库
                if (err) {
                  return;
                } else {//user信息插入成功
                  console.log('第' + page + '页，第' + i + '条采集成功');
                  if (i === items.length) {
                    return '采集成功';
                  }
                }
              });
            } else {//如果数据库存在此mobile的用户
              //res.send(user);
              if (i === items.length) {
                return '采集成功';
              }
            }
          }
        });
      }
    });
  }
}

ProductSvc.grabbingProducts = function () {
  var deferred = Q.defer();
  for (var i = 0; i < 12; i++) {
    request('http://www.dutyhb.com/hbzt-' + i + '.html', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const data = dataParse(body, i);
        deferred.resolve(data);
      }
    });
  }
  return deferred.promise;
};

exports.ProductSvc = ProductSvc;
