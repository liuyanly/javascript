window.onload = function() {
  var oInput = document.getElementsByTagName("input")[0];
  var oBtn = document.getElementsByTagName("button")[0];
  var oSum = document.getElementsByTagName("strong")[0];
  oInput.onkeyup = function() {
    var re = /[^(\d)|(,)]/;
    this.value = this.value.replace(re,"")
  }
  oBtn.onclick = function() {
    if(!oInput.value) {
      alert("不能为空,")
    }
    var arr = oInput.value.split(",");
    var sum = 0;
    for (var i in  arr) {
      sum += parseInt(arr[i])
    };
    oSum.innerHTML = sum
  }
}