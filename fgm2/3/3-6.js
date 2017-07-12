window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  aInput[1].onclick = function() {
    (aInput[0].value == "") ?
    alert("请输入数字！"):
    alert(/^\d{2}$/.test(parseInt(aInput[0].value)) ? "√ 是两位数":"这是"+aInput[0].value.length+"位数");
  }
  for (var i = 0; i < aInput.length-1; i++) {
    aInput[i].onkeyup = function() {
      this.value = this.value.replace(/[^\d]/,"")
    }
  };
}