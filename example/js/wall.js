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
  var aPos = [];
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
  oA.onclick = function() {
    randomOrder()
  }
  // 随机排序函数
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
  }
  function randomOrder(){
    aPos.sort(function(){ return Math.random() > 0.5 ? 1 : -1 });
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      doMove(aLi[i], aPos[i])
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
}
window.onload = function(){
  var aBox = byClass("box");
  for (var i = 0; i < aBox.length; i++) {
    wall(aBox[i])
  }
}