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
function wall(obj){
  var oA = byTagName("a",obj)[0];
  var oUl = byTagName("ul",obj)[0];
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
  // 随机排序函数
  function changeLayout(){

  }

}
window.onload = function(){
  var aBox = byClass("box");
  for (var i = 0; i < aBox.length; i++) {
    wall(aBox[i])
  }
}