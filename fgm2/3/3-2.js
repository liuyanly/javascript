window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  var oSpan = document.getElementsByTagName("span")[0];
  aInput[2].onclick = function() {
    (aInput[0].value == "" || aInput[1].value == "") ? alert("请输入数字!") :
    oSpan.innerHTML = sum(aInput[0].value,aInput[1].value)
  }

  for (var i = 0; i < aInput.length-1; i++) {
    aInput[i].onkeyup = function(){
      this.value = this.value.replace(/[^\d]/,"")
    }
  };

  function sum(a, b) {
    var sum = 0;
    return sum = parseInt(a) + parseInt(b);
  }
}