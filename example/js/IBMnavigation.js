function getStyle(element,attr){
  return parseInt(element.currentStyle?element.currentStyle[attr]:getComputedStyle(element,null)[attr])
}
function doMove(obj,iTarget,callBack){
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var iCur = getStyle(obj,"height");
    var iSpeed = (iTarget - iCur) / 5;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
    iTarget == iCur ? (clearInterval(obj.timer),callBack && callBack.call(obj)): obj.style.height = iCur + iSpeed + "px";
  },30)
}
window.onload = function() {
  var oWrap = document.getElementById("wrap");
  var oTopBar = document.getElementById("topBar");
  var oNav = document.getElementById("nav");
  function fnStatus(status) {
    !!status ?
    (function(){
      oNav.className = "hide";
      doMove(oTopBar,4);
      doMove(oNav,30);
    })():
    (function(){
      doMove(oTopBar,28);
      doMove(oNav,50,function(){
        this.className = ""
      });
    })()
  }
  window.onscroll = function(){
    var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    fnStatus(iScrollTop > 0)
    document.onmouseover = function(ev){
      var oEv = ev || event,
      oTarget = oEv.oTarget || oEv.srcElement,
      contains = function() {
        if(oWrap.contains) {
          return oWrap.contains(oTarget);
        }
        else if(oWrap.compareDocumentPosition) {
          return !!(oWrap.compareDocumentPosition(oTarget) & 16)
        }
      }();
      fnStatus(!contains && iScrollTop > 0)
    }
  }
}