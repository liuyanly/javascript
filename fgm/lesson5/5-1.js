window.onload = function() {
  var oSearch = document.getElementById("search");
  var oSpan = oSearch.getElementsByTagName("span")[0];
  var oUl = oSearch.getElementsByTagName("ul")[0];
  var aLi = oUl.getElementsByTagName("li");
  oSpan.onclick = function() {
    oUl.style.display = oUl.style.display=="block" ? "none" : "block";
    // 阻止事件冒泡
    (event || window.event).cancelBubble = true
  }
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onmouseover = function() {
      this.className = "hover"
    }
    aLi[i].onmouseout = function() {
      this.className = ""
    }
    aLi[i].onclick = function() {
      oSpan.innerHTML = this.innerHTML
    }
  };
  document.onclick = function() {
    oUl.style.display = "none";
  }
}