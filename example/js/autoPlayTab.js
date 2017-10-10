function byClass(sClass, oParent){
  var aClass = [];
  var reClass = new RegExp("(^| )"+sClass+"( |$)");
  var aElem = byTagName("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i]);
  }
  return aClass
}
function byTagName(elem,obj){
  return (obj || document).getElementsByTagName(elem)
}
window.onload = function(){
  var tabBox = document.getElementById("Tab_box");
  var oMenu = byTagName("ul",tabBox)[0];
  var aMenu = byTagName("li",oMenu);
  var oListBox = byClass("listbox",tabBox)[0];
  var aListBox = byTagName("li",oListBox);
  var iHeight = aListBox[0].offsetWidth;
  var iNow = 0;
  var autoPlay = null;
  // 点击切换
  for (var i = 0; i < aMenu.length; i++) {
    aMenu[i].index = i;
    aMenu[i].onclick = function(){
      iNow = this.index;
      show(iNow)
    }
  }
  // 自动播放
  function auto(){
    iNow++;
    iNow >= aListBox.length && (iNow = 0);
    show(iNow);
  }
  autoPlay = setInterval(function(){
    auto()
  },3000)
  tabBox.onmouseover = function(){
    clearInterval(autoPlay);
  }
  tabBox.onmouseout = function(){
    autoPlay = setInterval(function(){
      auto()
    },3000)
  }
  function show(a){
    for (var i = 0; i < aMenu.length; i++) {
      aMenu[i].className = ""
    }
    aMenu[a].className = "active";
    for (var j = 0; j < aListBox.length; j++) {
      aListBox[j].style.position = "";
      aListBox[j].style.left = "";
    }
    aListBox[a].style.position = "absolute";
    aListBox[a].style.left = -iHeight + "px";
    doMove(aListBox[a], 0);
  }
  function doMove(obj,iTarget,callBack){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      var iSpeed = (iTarget - obj.offsetLeft) / 5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
      obj.offsetLeft == iTarget ? (clearInterval(obj.timer),callBack && callBack.apply(this)): obj.style.left = iSpeed + obj.offsetLeft + "px"
    },30)
  }
}