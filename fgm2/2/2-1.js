window.onload = function() {
  var oBtn = document.getElementsByTagName("button")[0];
  var oIme = document.getElementById("ime");
  var oClose = document.getElementById("close");
  oBtn.onclick = function() {
    oIme.style.display = oIme.style.display == "block" ? "none":"block"
  }
  oClose.onclick = function() {
    oIme.style.display = "none"
  }
}