window.onload = function () {
  var oTips = document.getElementById("tips");
  var oLabel = document.getElementsByTagName("label")[0];
  oLabel.onmouseover = function() {
    oTips.style.display = "block";
  }
  oLabel.onmouseout = function() {
    oTips.style.display = "none";
  }
}