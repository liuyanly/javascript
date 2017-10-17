// 方法一:最简单原始的数组去重，效率应该是最低的
var arr = [1,12,10,14,11,14,1,11,14,16,18,31];
function noRepeat(){
  var newArr = [arr[0]];//将arr的第一个值放入newArr中
  for (var i = 0; i < arr.length; i++) {//遍历arr
    var flag = true;//遍历arr
    for (var j = 0; j < newArr.length; j++) {
      if(arr[i] == newArr[j]) {//如果arr当前的值与新数组有相等的值则将标志位置为false
        flag = false;
      }
    }
    if(flag) {//循环完新数组，如果flag为被置为false ，则将arr当前的值加入到新数组中
      newArr.push(arr[i])
    }
  }
  console.log(newArr);
}
noRepeat()
// 方法二：
// 将旧的数组先排序，判断当前的值是否与新数组最后一个值一致，
// 此方法相比于第一种来说效率较高，但有个缺陷，会将数组原来的顺序打乱。代码如下：
function noRepeat2(){
  arr.sort();//数组排序
  var newArr2 = [arr[0]];//将arr的第一个值放入新数组中
  for(var i = 1; i < arr.length;i++){
    if(arr[i] !== newArr2[newArr2.length-1]){//当前值与新数组最后一个值不等则将当前值放入新数组中。因为已将就数组排序，相等的值都是相邻的
      newArr2.push(arr[i])
    }
  }
  console.log(newArr2);
}
noRepeat2()
// 方法三：
// 定义一个空的对象。将旧数组的值存为对象的key值，再将对象的key值存入新数组。
// 这算是比较高效的数组去重方法了吧。代码如下：
function noRepeat3(){
  var obj = {};  //定义一个空对象
  var newArr3 = [];
  for (var i = 0; i < arr.length; i++) { //注意是从0开始
   if(!obj[arr[i]]){ //将arr当前值作为obj的key,判断对象是否存在
      obj[arr[i]] = 1; //将对象赋值为1
      newArr3.push(arr[i]); //将key值放入新数组中
   }
  }
  console.log(newArr3);
}
noRepeat3()
//方法四:利用hash数组的特殊性完成数组去重，其实这个方法和方法三是一个道理。代码如下:
function noRepeat4(){
  var hash = [];
  var newArr4 = [];
  for (var i = 0; i < arr.length; i++) {
    if(!hash[arr[i]]){ //将当前数组值设置为hash数组的key值
       hash[arr[i]] = 1;
       newArr4.push(arr[i])
    }
  }
  console.log(newArr4);
}
noRepeat4()