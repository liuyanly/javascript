window.onload = function() {
  var iPhone = document.getElementById("iphone");
  var oLock = document.getElementById("lock");
  var oBtn = oLock.getElementsByTagName("span")[0];
  oBtn.onmousemove = function(event) {
    var event = event || window.event;
    this.style.left = this.offsetLeft + "px";
  }
}