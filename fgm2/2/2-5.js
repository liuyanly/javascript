window.onload = function() {
   var aInput = document.getElementsByTagName("input");
   var aBtn   = document.getElementsByTagName("button");
   var oDiv   = document.getElementById("div1");
   aBtn[0].onclick = function() {
    changeStyle(oDiv, aInput[0].value, aInput[1].value)
   }
   aBtn[1].onclick = function() {
    // oDiv.style.cssText = "";
    oDiv.removeAttribute("style");
   }
}
function changeStyle(elem, attr, value) {
  elem.style[attr] = value;
}