window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  var oSure = document.getElementsByTagName("button")[0];
  var oReset = document.getElementsByTagName("button")[1];
  var oDiv = document.getElementById("div1");
  oSure.onclick = function() {
    changeStyle(oDiv,aInput[0].value,aInput[1].value)
  }
  oReset.onclick = function() {
    oDiv.style.cssText="";
  }
}
function changeStyle(elem, attr, val) {
  elem.style[attr] = val
}