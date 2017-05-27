function getId(id){
  return document.getElementById(id)
}
function getClass(sClass,oParent){
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = getTagName("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i]);
  };
  return aClass
}
function getTagName(elem,obj){
  return (obj || document).getElementsByTagName(elem);
}
window.onload = function(){
  var oNav = getId("nav");
  var aLi = getTagName("li",oNav);
  var aSubnav = getClass("subnav",oNav);
  var timer = null;
  for (var i = 1; i < aLi.length; i++) {
    aLi[i].onmouseover = function(){
      // 隐藏所有子菜单
      for (var i = 0; i < aSubnav.length; i++) {
        aSubnav[i].style.display = "none";
      };
      // 获取该项下的子菜单
      oSubnav = getClass("subnav",this)[0];
      // 获取该项下的指示箭头
      oEm = getTagName("em",this)[0];
      // 显示该项下的子菜单
      oSubnav.style.display = "block";
      // 判断显示区域
      oNav.offsetWidth - this.offsetLeft > oSubnav.offsetWidth ?
      // 如果在显示范围居左显示
      oSubnav.style.left = this.offsetLeft + "px":
      // 超出显示范围居右显示
      oSubnav.style.right = 0;
      // 计算箭头显示位置
      oEm.style.left = this.offsetLeft - oSubnav.offsetLeft + 50+ "px";
      clearTimeout(timer);
      // 阻止事件冒泡
      oSubnav.onmouseover = function(event){
        (event || window.event).cancelBubble = true;
        clearTimeout(timer)
      }
    }
    aLi[i].onmouseout = function(){
      timer = setTimeout(function(){
        oSubnav.style.display="none";
      },300)
    }
  };
}
