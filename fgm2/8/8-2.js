var EventUtil = {
  addHandler: function(element,sEvent,fnHandler) {
    element.addEventListener?element.addEventListener(sEvent,fnHandler,false):element.attachEvent("on"+sEvent,fnHandler)
  },
  removeHandler: function(element, sEvent,fnHandler) {
    element.removeEventListener?element.removeEventListener(sEvent,fnHandler,false):element.detachEvent("on"+sEvent,fnHandler)
  },
  addLoadHandler: function(fnHandler) {
    this.addHandler(window,"load",fnHandler)
  }
}
function $(id){
  return typeof id === "string" ? document.getElementById(id):id;
}
function $$(sClass, oParent){
  var aClass = [];
  var reClass = new RegExp("(^|\s)"+sClass+"(\s|$)");
  var aElem = $$$("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass
}
function $$$(elem,obj) {
  return (obj || document).getElementsByTagName(elem)
}
function getStyle(obj, attr){
  return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr])
}
EventUtil.addLoadHandler(function(){
  var oBox = $("box");
  var oList = $$("list",oBox)[0];
  var oUl = $$$("ul",oList)[0];
  var aLi = $$$("li",oUl);
  var oScrollBar = $$("scrollBar",oBox)[0];
  var oBarL = $$("barL",oScrollBar)[0];
  var oBarM = $$("barM",oScrollBar)[0];
  var oBar = $$("bar",oBarM)[0];
  var oBarR = $$("barR",oScrollBar)[0];
  var maxL = oBarM.offsetWidth - oBar.offsetWidth;
  var iMarginRight = getStyle(aLi[0],"marginRight");
  var timer = null;
  var iScale = 0;
  var disX = 0;

  oUl.style.width = (aLi[0].offsetWidth + iMarginRight) * iMarginRight + "px";
  //拖动滚动条
  oBar.onmousedown = function(event) {
    var event = event || window.event;
    var disX = event.clientX - oBar.offsetLeft;
    document.onmousemove = function(event) {
      var event = event || window.event;
      var iL = event.clientX - disX;

      iL <= 0 && (iL = 0);
      iL >= maxL && ( iL = maxL);

      oBar.style.left = iL + "px";
      iScale = iL / maxL;
      return false;
    }
    document.onmouseup = function() {
      startMove(oUl,parseInt(oList.offsetWidth+iMarginRight - oUl.offsetWidth)*iScale);
      isStop();
      document.onmousemove = null;
      document.onmouseup = null;
    }
    return false;
  }
  // 阻止滚动条点击事件冒泡
  oBar.onclick = function(event){
    (event || window.event).cancelBubble = true
  }
  //滚动条左右按钮鼠标移入及键盘左右键按下事件
  oBarL.onmouseover = oBarR.onmouseover = document.onkeydown = function(event) {
    clearInterval(timer);
    var event = event || window.event;
    var iSpeed = 0;
    if(this == oBarR || event.keyCode == 39){
      iSpeed = 5;
    }else if(this == oBarL || event.keyCode == 37) {
      iSpeed = -5;
    }
    timer = setInterval(function(){
      togetherMove(getStyle(oBar, "left") + iSpeed, 1)
    },30)
  }
  //滚动条左右按钮鼠标移开及键盘左右抬起事件
  oBarL.onmouseout = oBarR.onmouseout = document.onkeyup = function() {
    clearInterval(timer)
  }
  //滚动条可移动区域点击事件
  oBarM.onclick = function(event) {
    var iTarget = (event || window.event).clientX - oBox.offsetLeft - this.offsetLeft - oBar.offsetWidth /2;
    togetherMove(iTarget)
  }
  //鼠标滚轮事件
  oBox.onmouseover = function(event){
    event = event || window.event;
    function mouseWheel(event){
      var delta = event.wheelDelta?event.wheelDelta:-event.detail*40;
      var iTarget = delta > 0 ? -50 : 50;
      togetherMove(oBar.offsetLeft+iTarget)
    }
    EventUtil.addHandler(this,"mouseWheel",mouseWheel);
    EventUtil.addHandler(this,"DOMMouseScroll",mouseWheel)
  }
  //图片列表和流动图片同时移动
  function togetherMove(iTarget, buffer){
    if(iTarget <= 0){
      timer && clearInterval(timer);
      iTarget = 0
    }else if(iTarget >= maxL){
      timer && clearInterval(timer);
      iTarget = maxL
    }
    iScale = iTarget / maxL;
    startMove(oUl,parseInt((oList.offsetWidth + iMarginRight- oUl.offsetWidth) * iScale), function(){isStop()},buffer);
    startMove(oBar,iTarget,function(){isStop()},buffer);
  }
  //判断滚动条是否到达边界
  function isStop() {
    oBarL.className = "barL";
    oBarR.className = "barR";
    switch(oBar.offsetLeft){
      case 0:
        /(^|\s)barLStop(\s|$)/.test(oBarL.className) || (oBarL.className += " barLStop");
        break;
      case maxL:
        /(^|\s)barRStop(\s|$)/.test(oBarR.className) || (oBarR.className += " barRStop");
        break;
    }
  }
  isStop();
})
function startMove(obj, iTarget, fnEnd, buffer) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      doMove(obj, iTarget, fnEnd, buffer);
    },30)
}
function doMove(obj, iTarget, fnEnd, buffer) {
  var iLeft = getStyle(obj,"left");
  var iSpeed = (iTarget - iLeft) / (buffer || 5);
  iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
  iLeft == iTarget ? (clearInterval(obj.timer),fnEnd && fnEnd()): obj.style.left = iLeft + iSpeed + "px"
}
