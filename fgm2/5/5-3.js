window.onload = function () {
  var oP = document.getElementsByTagName("p")[0];
  document.onkeydown = function(event) {
    var event = event || window.event;
    oP.innerHTML = event.keyCode;
    return false
  }
}