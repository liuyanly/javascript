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
  var index = 0;
  var count = Math.ceil((aLi.length-10) / 5); // 所有图片能移动几次
  var iWidthAll = aLi[0].offsetWidth * aLi.length; //总的宽度
  var iWidthOne = aLi[0].offsetWidth * 5; //一次移动5个，移动的宽度
  oUl.style.width = iWidthAll + "px";
  oUl.style.transform = "translateX("+(-(iWidthOne))+"px)";
  oUl.style.transitionProperty = "transform";
  oUl.style.transitionDuration = "0.6s";
  console.log(count);
  oWrapper.onmouseover=function(){
    aControl.style.display = "block"
  }
  oWrapper.onmouseout=function(){
    aControl.style.display = "none"
  }
  oPrev.onclick = function(){
      index == 0 && (index = count);
      oUl.style.transform = "translateX("+(-(iWidthOne*index))+"px)";
      index--;
  }
  oNext.onclick = function(){
    index++;
    index == count && (index = 0);
    oUl.style.transform = "translateX("+(-(iWidthOne*index))+"px)";
  }
}