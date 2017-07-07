window.onload = function() {
  var aMenu = document.getElementById("tab").getElementsByTagName("li");
  var aCon  = document.getElementById("content").getElementsByTagName("ul");
  for (var i = 0; i < aMenu.length; i++) {
    aMenu[i].index = i;
    aMenu[i].onclick = function() {
      for (var j = 0; j < aMenu.length; j++) {
        aMenu[j].className = " "
      };
      aMenu[this.index].className="current";
      for (var j = 0; j < aCon.length; j++) {
        aCon[j].style.display = "none"
      };
      aCon[this.index].style.display = "block";
    }
  };
}