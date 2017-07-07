window.onload = function() {
  var oDiv1 = document.getElementById("div1");
  oDiv1.onmouseover = function() {
    this.className = "hover"
  }
  oDiv1.onmouseout = function() {
    this.className = "";
  }
}