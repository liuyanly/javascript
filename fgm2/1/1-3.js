window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  var oBtn   = document.getElementsByTagName("button")[0];
  oBtn.onclick = function() {
    myFn(aInput[0], aInput[1])
  }
}
function myFn(a, b) {
   alert(a.value);
   alert(b.value);
}