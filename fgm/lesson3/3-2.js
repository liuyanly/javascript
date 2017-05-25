window.onload = function(){
  var aInput = document.getElementsByTagName("input");
  var oSum = document.getElementsByTagName("span")[0];
  for (var i = 0; i < aInput.length-1; i++) {
    aInput[i].onkeyup = function(){
      this.value = this.value.replace(/[^\d]/,"")
    }
  };
  aInput[2].onclick = function(){
    var sum = 0;
    sum = parseInt(aInput[0].value) + parseInt(aInput[1].value);
    (aInput[0].value == "" || aInput[1].value == "") ? alert("请输入数字！") : oSum.innerHTML = sum
  }
}