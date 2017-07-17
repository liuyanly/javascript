window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  for (var i = 0; i < aInput.length-1; i++) {
    aInput[i].onfocus = function() {
      this.className = "f-text-high"
    }
    aInput[i].onblur = function() {
      this.className = "f-text"
    }
  };
}