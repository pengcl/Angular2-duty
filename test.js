function mGetDate(date) {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
}

var totalDay = mGetDate(new Date());

console.log(totalDay);
