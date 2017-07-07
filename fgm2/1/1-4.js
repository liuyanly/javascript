window.onload = function() {
  var oBtn = document.getElementsByTagName("button")[0];
  var aDiv = document.getElementById("outer").getElementsByTagName("div");
  oBtn.onclick = function() {
    for (var i = 0; i < aDiv.length; i++) {
      aDiv[i].style.background = "red";
    };
  }
}