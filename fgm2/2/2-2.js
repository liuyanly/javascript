window.onload = function() {
  var aDiv = document.getElementById("outer").getElementsByTagName("div");
  for (var i = 0; i < aDiv.length; i++) {
    aDiv[i].onclick = function() {
      alert(this.innerHTML)
    }
  };
}