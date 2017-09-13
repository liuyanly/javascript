//求和
Array.prototype.sum = function() {
  for (var sum = i = 0; i < this.length; i++) {
    sum += parseInt(this[i])
  };
  return sum
}
//求最大值
Array.prototype.maxima = function(){
  for (var i = 0, maxValue = Number.MIN_VALUE; i < this.length; i++) {
    parseInt(this[i]) > maxValue &&  (maxValue = this[i])
  };
  return maxValue
}
//应用
var arr = [1,21,3,4,22,45,6,7,32];
alert(arr.join("+")+"="+arr.sum());
alert(arr.join("|")+"中，最大的值是"+arr.maxima());