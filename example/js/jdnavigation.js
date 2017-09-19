function byId(id) {
  return typeof id === "string" ? document.getElementById(id):id
}
function byClass(sClass, oParent){
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = byTagName("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i]);
  }
  return aClass;
}
function byTagName(elem,obj){
  return (obj || document).getElementsByTagName(elem);
}
window.onload = function(){
  var oCate = byClass("cate")[0];
  var oCateMenu = byClass("cate_menu",oCate)[0];
  var aCateItem = byClass("cate_menu_item",oCate);
  var oCatePop = byClass("cate_pop",oCate)[0];
  var aCatePart = byClass("cate_part",oCate);
  var timer = null
  for (var i = 0; i < aCateItem.length; i++) {
    aCateItem[i].index = i;
    aCatePart[i].index = i;
    aCateItem[i].onmouseover = function(){
      for (var j = 0; j < aCateItem.length; j++) {
        aCateItem[j].className = "cate_menu_item";
        aCatePart[j].style.display = "none";
        aCatePart[j].parentNode.style.display = "none";
      };
      this.className += " cate_menu_item_on";
      aCatePart[this.index].style.display = "block";
      aCatePart[this.index].parentNode.style.display = "block";
      clearTimeout(timer);
    }
    aCateItem[i].onmouseout = function(){
      var that = this;
      timer = setTimeout(function(){
        that.className = "cate_menu_item";
        aCatePart[that.index].style.display = "none";
        aCatePart[that.index].parentNode.style.display = "none";
      },200)
    }
    aCatePart[i].onmouseover = function(){
      clearTimeout(timer)
    }
    aCatePart[i].onmouseout = function(){
      var that = this;
      timer = setTimeout(function(){
        aCateItem[that.index].className = "cate_menu_item";
        that.style.display = "none";
        that.parentNode.style.display = "none";
      },200)
    }
  };
}
