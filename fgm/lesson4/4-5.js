function css(obj,attr,value){
  switch(arguments.length){
    case 2:
      if(typeof arguments[1] == "object") {
        // 二个参数，如果第二个参数是对象，批量设置属性
        for(var i in attr) obj.style[i] = attr[i]
      }
      else{
        // 二个参数，如果第二个参数是字符串，读取属性值
        return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,null)[attr]
      }
      break;
    case 3:
      // 三个参数，单一设置属性
      obj.style[attr] = value;
      break;
    default:
      alert("参数错误！")
  }
}
window.onload = function() {
  var oBox = document.getElementById("box");
  var aInput = oBox.getElementsByTagName("input");
  // 第一个按钮点击事件
  aInput[0].onclick = function(){
    // 两个参数，第二个参数为字符串，读取属性值
    alert("width:" + css(oBox,"width") + "\nheight:"+
      css(oBox,"height")+"\nbackground-color:"+css(oBox,"backgroundColor"))
  }
  // 第二个按钮点击事件
  aInput[1].onclick = function() {
    // 两个参数，第二个参数为对象，属性批量设置
    css(oBox,{width:"330px",height:"100px",borderColor:"#0084ff",backgroundColor:"#eff8ff"});
    // 三个参数，属性单一设置
    for (var i = 0; i < aInput.length; i++) {
      css(aInput[i],"backgroundColor","#0084ff")
    };
  }
  // 第三个按钮点击事件
  aInput[2].onclick = function(){
    // 两个参数，第二个参数为对象，属性批量设置
    css(oBox,{width:"400px",height:"200px",borderColor:"#f60",backgroundColor:"#fef4eb"});
    // 三个参数，属性单一设置
    for (var i = 0; i < aInput.length; i++) {
      css(aInput[i],"backgroundColor","#f60")
    };
  }
}