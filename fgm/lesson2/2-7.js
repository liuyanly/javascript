window.onload = function() {
  var aLi = document.getElementById("tab").getElementsByTagName("li");
  var aUl = document.getElementById("content").getElementsByTagName("ul");
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].index = i;
    aLi[i].onmouseover = function() {
      for (var j = 0; j < aLi.length; j++) {
        aLi[j].className = "";
      };
      this.className = "current";
      for (var j = 0; j < aUl.length; j++) {
        aUl[j].style.display = "none"
      };
      aUl[this.index].style.display = "block"
    }
  }
}
