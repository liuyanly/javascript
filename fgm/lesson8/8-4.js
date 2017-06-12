//获取id, class, tagName
function getId(id) {
  return typeof id === "string " ? document.getElementById(id) : id
}
function getClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = getTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass;
}
function getTagName(elem, obj) {
  return (obj || document).getElementsByTagName(elem)
}
var dragMinWidth = 250;
var dragMinHeight = 124;
//拖拽函数
function drag(oDrag, handle) {
  var disX = disY = 0;
  var oMin = getClass("min", oDrag)[0];
  var oMax = getClass("max", oDrag)[0];
  var oRevert = getClass("revert", oDrag)[0];
  var oClose = getClass("close", oDrag)[0];
  handle = handle || oDrag;
  handle.style.cursor = "move";
  handle.onmousedown = function (event) {
    var event = event || window.event;
    disX = event.clentX - oDrag.offsetLeft;
    disY = event.clentY - oDrag.offsetTop;
    document.onmousemove = function(event){
      var event = event || window.event
    }
  }
}

window.onload = function() {

}