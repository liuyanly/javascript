function changeStyle(elem, attr, value) {
  elem.style[attr] = value
}
window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  var oDiv   = document.getElementById("div1");
  var oAttr = ["width", "height", "background", "display", "display"];
  var oValue = ["200px", "200px", "red","none", "block"]
  for (var i = 0; i < aInput.length; i++) {
    aInput[i].index = i;
    aInput[i].onclick = function() {
      this.index == aInput.length-1 && (oDiv.style.cssText = "");
      changeStyle(oDiv, oAttr[this.index], oValue[this.index])
    }
  };
}
