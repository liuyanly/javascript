window.onload = function() {
  var oBtn = document.getElementsByTagName("button")[0];
  var oLayer = document.getElementById("overlay");
  var oWin = document.getElementById("win");
  var oClose = document.getElementById("close");
  oBtn.onclick = function() {
    oLayer.style.display = oWin.style.display = "block";
  }
  oClose.onclick = function() {
    oLayer.style.display = oWin.style.display = "none";
  }
}