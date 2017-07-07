window.onload =function() {
  var oBox = document.getElementById("outer");
  var oTit = oBox.getElementsByTagName("h2")[0];
  var oUl  = oBox.getElementsByTagName("ul")[0];
  oTit.onclick = function() {
    oUl.style.display = oUl.style.display == "none" ? "block" : "none";
    oTit.className = oUl.style.display == "none" ? "open" : "";
  }
}