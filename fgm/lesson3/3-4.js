window.onload = function(){
  var aInput = document.getElementsByTagName("input");
  var oResult = document.getElementsByTagName("span")[0];
  for (var i = 0; i < aInput.length-1; i++) {
    aInput[i].onkeyup = function(){
      this.value = this.value.replace(/[^\d]/,"")
    }
  };
  aInput[2].onclick = function() {
    (aInput[0].value == "" || aInput[1].value == "") ? alert("请输入数字！"):
    oResult.innerHTML = Math.max(aInput[0].value,aInput[1].value)
  }
}