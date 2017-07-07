window.onload = function() {
  var oLink = document.getElementsByTagName("link")[0];
  var oSkin = document.getElementById("skin");
  var aLi   = oSkin.getElementsByTagName("li");
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function() {
      for (var i = 0; i < aLi.length; i++) {
        aLi[i].className = " "
      };
      this.className = "current";
      oLink.href = this.id+".css";
    }
  };
}