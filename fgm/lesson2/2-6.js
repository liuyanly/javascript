window.onload = function() {
  var aLi = document.getElementById("imgList").getElementsByTagName("li");
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onmouseover = function() {
      this.className = "current"
    }
    aLi[i].onmouseout = function() {
      this.className = ""
    }
  };
}