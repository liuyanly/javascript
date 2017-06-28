window.onload = function() {
  var oNav = document.getElementById("nav").getElementsByTagName("ul")[0];
  var oSub = document.getElementById("sub");
  var aNav = oNav.getElementsByTagName("li");
  var aSub = oSub.getElementsByTagName("ul");
  var timer = null;
  var i = 0;
  //二级菜单显示
  oNav.onmouseover = oSub.onmouseover = function() {
    clearInterval(timer);
    doMove(oSub, 153)
  }
  //二级菜单隐藏
  oNav.onmouseout = oSub.onmouseout = function() {
    timer = setTimeout(function(){
      doMove(oSub, 0)
    },200);
  }
  //菜单当前位置
  for (var i = 0; i < aNav.length; i++) {
    (function(index){
      aNav[index].onmouseover = aSub[index].onmouseover = function() {
        for (i = 0; i < aNav.length; i++) {
          aNav[i].className = aSub[i].className = "";
          index && (aNav[index].className = aSub[index].className = "current");
        };
      }
      aNav[index].onmouseout = aSub[index].onmouseout = function() {
        aNav[index].className = aSub[index].className = "";
      }
    })(i)
  };
  function doMove(obj, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var iSpeed = (iTarget - obj.offsetHeight) / 5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      obj.offsetHeight == iTarget ? clearInterval(obj.timer) :
      (obj.style.height = iSpeed + obj.offsetHeight + "px");
    },30);
  }
}