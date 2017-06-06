window.onload = function() {
  var oMenu = document.getElementById("menu");
  var aLi = oMenu.getElementsByTagName("li");
  //加载后隐藏自定义右键菜单
  oMenu.style.display = "none";
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onmouseover = function () {
      this.className = "active"
    }
    aLi[i].onmouseout = function () {
      this.className = ""
    }
  };
  document.oncontextmenu = function(event) {
    var event = event || window.event;
    var style = oMenu.style;
    style.display = "block";
    style.top = event.clientY + "px";
    style.left = event.clientX + "px";
    return false;
  }
  document.onclick = function() {
    oMenu.style.display = "none"
  }
}