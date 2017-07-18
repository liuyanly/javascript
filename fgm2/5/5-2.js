document.onclick = function(event) {
  var event = event || window.event;
  alert("坐标:["+event.clientX+","+event.clientY+"]")
}