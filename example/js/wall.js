function byId(id) {
  return typeof id === "string" ? document.getElementById(id):id
}
function byClass(sClass, oParent){
  var aClass = [];
  var reClass = new RegExp("(^| )"+sClass+"( |$)");
  var aElem = byTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  }
  return aClass;
}
function byTagName(elem,obj){
  return (obj || document).getElementsByTagName(elem)
}
// 获取元素的位置
function getPos(obj) {
  var iTop = obj.offsetTop;
  var iLeft = obj.offsetLeft;
  while(obj.offsetParent)
  {
    iTop += obj.offsetParent.offsetTop;
    iLeft += obj.offsetParent.offsetLeft;
    obj = obj.offsetParent;
  }
  return {top:iTop, left:iLeft}
}
function wall(obj){
  var oParent = byId(obj);
  var oA = byTagName("a",oParent)[0];
  var oUl = byTagName("ul",oParent)[0];
  var aLi = byTagName("li",oUl);
  var zIndex = 1;
  var aPos = [];
  var dom = document.documentElement || document.body;
  // 创建照片
  var oFrag = document.createDocumentFragment();
  for (var i = 0; i < 20; i++) {
    var oLi = document.createElement("li");
    var oImg = document.createElement("img");
    oImg.src = "img/photo/"+i+".jpg";
    oLi.appendChild(oImg);
    oFrag.appendChild(oLi);
  }
  oUl.appendChild(oFrag);
  changeLayout();
  function changeLayout(){
    var i = 0;
    oParent.style.height = oParent.offsetHeight - 2 + "px";
    aPos.length = 0 ;
    for (i = 0; i < aLi.length; i++) {
      aLi[i].style.cssText = "";
    }
    for (i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      aLi[i].style.top = getPos(aLi[i]).top + "px";
      aLi[i].style.left = getPos(aLi[i]).left + "px";
      aPos.push({left:getPos(aLi[i]).left,top:getPos(aLi[i]).top})
    }
    for (i = 0; i < aLi.length; i++) {
      aLi[i].style.position = "absolute";
      aLi[i].style.margin = "0";
      drag(aLi[i]);
    }
  }
  // 随机排序函数
  oA.onclick = function() {
    randomOrder()
  }
  function randomOrder(){
    aPos.sort(function(){ return Math.random() > 0.5 ? 1 : -1 });
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      doMove(aLi[i], aPos[i])
    }
  }
  function drag(obj,handle) {
    var handle = handle || obj;
    handle.style.cursor = "move";
    handle.onmousedown = function(event){
      var event = event || window.event;
      var disX = event.clientX - this.offsetLeft;
      var disY = event.clientY - this.offsetTop;
      var oNear = null;
      handle.style.zIndex = zIndex++;
      document.onmousemove = function(event){
        var event = event || window.event;
        var iL = event.clientX - disX;
        var iT = event.clientY - disY;
        var MaxL = Math.max(dom.clientWidth, dom.scrollWidth) - handle.offsetWidth;
        var MaxT = Math.max(dom.clientHeight, dom.scrollHeight) - handle.offsetHeight;

        iL < 0 && (iL = 0);
        iT < 0 && (iT = 0);
        iL > MaxL && (iL = MaxL);
        iT > MaxT && (iT = MaxT);

        handle.style.left = iL + "px";
        handle.style.top = iT + "px";

        oNear = findNearest(obj);
        for (var i = 0; i < aLi.length; i++) {
          aLi[i].className = "";
        }
        oNear && (oNear.className = "hig");
        return false;
      }
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        if(oNear){
          handle.index = [handle.index, oNear.index];
          oNear.index = handle.index[0];
          handle.index = handle.index[1];
          oNear.style.zIndex = zIndex++;
          doMove(handle,aPos[handle.index]);
          doMove(oNear,aPos[oNear.index]);
          oNear.className = "";
        }else{
          doMove(handle,aPos[handle.index])
        }
        handle.releaseCapture && handle.releaseCapture()
      }
      this.setCapture && this.setCapture();
      return false
    }
  }
  function doMove(obj, iTarget, callBack){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      var iCurL = getPos(obj).left;
      var iCurT = getPos(obj).top;
      var iSpeedL = (iTarget.left - iCurL) / 5;
      var iSpeedT = (iTarget.top - iCurT) / 5;
      iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
      iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);

      if(iCurL == iTarget.left && iCurT == iTarget.top){
        clearInterval(obj.timer);
        callBack && callBack();
      }else{
        obj.style.left = iCurL + iSpeedL + "px";
        obj.style.top = iCurT + iSpeedT + "px";
      }
    },30)
  }
  function findNearest(obj){
    var aDistance = [];
    var i = 0;
    for (var i = 0; i < aLi.length; i++) {
      aDistance[i] = aLi[i] == obj ? Number.MAX_VALUE : getDistance(obj,aLi[i]);
    }
    var minNum = Number.MAX_VALUE;
    var minIndex = -1;

    for (i = 0; i < aDistance.length; i++) {
      aDistance[i] < minNum && (minNum = aDistance[i], minIndex = i);
    }

    return isButt(obj,aLi[minIndex]) ? aLi[minIndex] : null
  }
  function getDistance(obj1,obj2){
    var a = (obj1.offsetLeft + obj1.offsetWidth/2) - (obj2.offsetLeft + obj2.offsetWidth/2);
    var b = (obj1.offsetTop + obj1.offsetTop / 2) - (obj2.offsetTop + obj2.offsetTop / 2);
    return Math.sqrt(a*a + b*b)
  }
  function isButt(obj1,obj2){
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;
    var r1 = l1 + obj1.offsetWidth;
    var b1 = t1 + obj1.offsetHeight;

    var l2 = obj2.offsetLeft;
    var t2 = obj2.offsetTop;
    var r2 = l2 + obj2.offsetWidth;
    var b2 = t2 + obj2.offsetHeight;

    return !(r2 < l1 || b2 < t1 || r1 < l2 || b1 < t2)
  }
}
window.onload = function(){
  var aBox = byClass("box");
  for (var i = 0; i < aBox.length; i++) {
    wall(aBox[i])
  }
}