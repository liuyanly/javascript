function byTagName(elem,obj) {
  return (obj||document).getElementsByTagName(elem)
}
function byClass(sClass,oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )"+sClass+"( |$)");
  var aElem = byTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  }
  return aClass
}
window.onload = function(){
  var oWrapper = byClass("sk_list_wrapper")[0];
  var aControl = byClass("sk_controls",oWrapper)[0];
  var oPrev = byTagName("a",aControl)[0];
  var oNext = byTagName("a",aControl)[1];
  var oUl = byClass("sk_list", oWrapper)[0];
  var aLi = byClass("sk_item", oWrapper);
  var count = parseInt(aLi.length / 5); // 一列显示5个，得出可以滑动几次
  var iWidthAll = aLi[0].offsetWidth * aLi.length; //总的宽度
  var iWidthOne = aLi[0].offsetWidth * 5; //一次移动5个，移动的宽度
  oUl.style.width = iWidthAll + "px";
  oWrapper.onmouseover=function(){
    aControl.style.display = "block"
  }
  oWrapper.onmouseout=function(){
    aControl.style.display = "none"
  }
  oPrev.onclick = function(){


    // for(var i= 0 ; i < aLi.length; i++) {
    //   oUl.style.transform = translateX(aLi[0].offsetWidth * (i+1) * 5);
    // }

  }
}