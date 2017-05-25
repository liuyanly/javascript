window.onload = function() {
  var oTitle = document.getElementById("outer").getElementsByTagName("h2")[0];
  var oUl = document.getElementById("outer").getElementsByTagName("ul")[0];
  oTitle.onclick = function() {
    var style = oUl.style;
    style.display = style.display == "none" ? "block" : "none";
    oTitle.className = style.display == "none" ? "open" : "";
  }
}