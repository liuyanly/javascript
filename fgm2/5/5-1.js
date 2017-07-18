window.onload = function () {
  var oSearch = document.getElementById("search");
  var oSpan = oSearch.getElementsByTagName("span")[0];
  var oSub = oSearch.getElementsByTagName("ul")[0];
  var aLi = oSub.getElementsByTagName("li");
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onmouseover = function() {
      this.className = "hover"
    }
    aLi[i].onmouseout = function(){
      this.className = ""
    }
    aLi[i].onclick = function() {
      oSpan.innerHTML = this.innerHTML
    }
  };
  oSpan.onclick = function(){
    oSub.style.display = oSub.style.display == "block"?"none":"block";
    //阻止事件冒泡
    (event || window.event).cancelBubble = true
  }
  document.onclick = function() {
    oSub.style.display = "none"
  }
}