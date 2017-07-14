var iResult = 0;
function sum () {
  for (var i = 0; i < arguments.length; i++) {
    iResult += arguments[i]
  };
  return iResult
}
//应用
alert(sum(1,2,3,4,5,6,7,8,9,10))
