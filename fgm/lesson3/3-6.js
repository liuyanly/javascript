window.onload = function() {
  var aInput = document.getElementsByTagName("input");
  aInput[0].onkeyup = function(){
    this.value = this.value.replace(/[^\d]/,"");
  }
  aInput[1].onclick = function() {
    var num = aInput[0].value;
    // if(aInput[0].value == ""){
    //   alert("请输入数字!")
    // }else if(num.length == 2){
    //   alert("是两位数!")
    // }else{
    //   alert("不是两位数！")
    // }
    (aInput[0].value == "")?alert("请输入数字!"):
    alert(/^\d{2}$/.test(parseInt(num))?"√是两位数":"这是"+num.length+"位数");
  }
}