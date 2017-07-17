function css(obj, attr, value) {
  switch(arguments.length){
    case 2:
      if(typeof arguments[1] == "object"){
        for(var i in attr) obj.style[i] = attr[i]
      }else{
        return obj.currentStyle ? obj.currentStyle[attr]:
        getComputedStyle(obj,null)[attr]
      }
      break;
    case 3:
      obj.style[attr] = value
      break;
    default:
      alert("参数错误！")
  }
}
window.onload = function() {
  var oBox = document.getElementById("box");
  var aInput = document.getElementsByTagName("input");
  aInput[0].onclick = function() {
    alert("width:" + css(oBox,"width")+"\nheight"+css(oBox,"height")+"\nbackground-color:"+css(oBox,"backgroundColor"))
  }
  aInput[1].onclick = function() {
    css(oBox, {width: "330px",height: "100px",borderColor: "#0084ff",backgroundColor: "#eff8ff"});
    for (var i = 0; i < aInput.length; i++) {
      css(aInput[i],"backgroundColor","#0084ff")
    };
  }
  aInput[2].onclick = function() {
    css(oBox, {width: "400px", height: "200px", borderColor: "#f60", backgroundColor: "#fef4eb"});
    for (var i = 0; i < aInput.length; i++) {
      css(aInput[i],"backgroundColor", "#f60")
    };
  }
}