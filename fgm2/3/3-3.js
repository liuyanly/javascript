window.onload = function() {
  var oInput = document.getElementsByTagName("input")[0];
  var count = 0;
  oInput.onclick = function() {
    this.value = ++count;
    alert(count);
  }
}