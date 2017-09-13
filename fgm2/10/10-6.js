function byId(id){
  return typeof id === "string" ?document.getElementById(id):id
}
function byTagName(elem,obj) {
  return (obj || document).getElementsByTagName(elem);
}
function byClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )"+sClass+"( |$)");
  var aElem = byTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i]);
  };
  return aClass;
}
// 面向对象版
function Roll(){
  this.initialize.apply(this,arguments)
}
Roll.prototype =  {
  initialize: function(obj) {
    var _this = this;
    this.obj = byId(obj);
    this.oUp = byClass("up",this.obj)[0];
    this.oDown = byClass("down",this.obj)[0];
    this.oList = byClass("list",this.obj)[0];
    this.aItem = byTagName("li",this.oList);
    this.timer = null;
    this.iHeight = this.aItem[0].offsetHeight;
    this.oUp.onclick = function(){
      _this.up()
    };
    this.oDown.onclick = function(){
      _this.down()
    }
  },
  up: function() {
    this.oList.insertBefore(this.aItem[this.aItem.length-1],this.oList.firstChild);
    this.oList.style.top = -this.iHeight+"px";
    this.doMove(0);
  },
  down: function() {
    this.doMove(-this.iHeight,function(){
      this.oList.appendChild(this.aItem[0]);
      this.oList.style.top = 0;
    })
  },
  doMove: function(iTarget,callBack) {
    var _this = this;
    clearInterval(this.timer);
    this.timer = setInterval(function(){
      var iSpeed = (iTarget - _this.oList.offsetTop)/5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);

      _this.oList.offsetTop == iTarget ?
      (clearInterval(_this.timer), callBack && callBack.apply(_this)):
      _this.oList.style.top = iSpeed + _this.oList.offsetTop + "px"
    },30)
  }
}
window.onload = function(){
  new Roll("box");
}

// window.onload = function() {
//   var oBox = byId("box");
//   var oPrev = byClass("up", oBox)[0];
//   var oNext = byClass("down", oBox)[0];
//   var oUl = byClass("list", oBox)[0];
//   var aLi = byTagName("li", oUl);
//   var timer = null;
//   var iHeight = aLi[0].offsetHeight;
//   oPrev.onclick = function() {
//     oUl.insertBefore(aLi[aLi.length-1],oUl.firstChild);
//     oUl.style.top = -iHeight + "px";
//     doMove(0);
//   }
//   oNext.onclick = function() {
//     doMove(-iHeight, function(){
//       oUl.appendChild(aLi[0]);
//       oUl.style.top = 0;
//     })
//   }
//   function doMove(iTarget,callBack){
//     clearInterval(timer);
//     timer = setInterval(function(){
//       var iSpeed = (iTarget - oUl.offsetTop) / 5;
//       iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
//       oUl.offsetTop == iTarget ?
//       (clearInterval(timer),callBack && callBack.apply(this)):
//       oUl.style.top = iSpeed + oUl.offsetTop + "px"
//     },30)
//   }
// }