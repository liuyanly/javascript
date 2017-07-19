window.onload = function() {
  var oBox = document.getElementById("box");
  var timer = null;
  oBox.onclick = function() {
    var i = 0;
    clearInterval(timer);
    timer = setInterval(function(){
      oBox.style.display = i++ % 2 ? "none" : "block";
      i > 6 && (clearInterval(timer))
    },80)
  }
}