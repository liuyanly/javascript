var getOffset = {
  top: function(obj) {
    return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
  },
  left: function(obj) {
    return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
  }
}
window.onload = function () {
  var oMenu = document.getElementById("rightMenu");
  var aUl = oMenu.getElementsByTagName("ul");
  var aLi = oMenu.getElementsByTagName("li");
  var showTimer = hideTimer = null;
  var maxWidth = maxHeight = 0;
  var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
  oMenu.style.display = "none";
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");

    aLi[i].onmouseover = function() {
      var oThis = this;
      var oUl = oThis.getElementsByTagName("ul");
      oThis.className += " active";

      if(oUl[0]) {
        clearTimeout(hideTimer);
        showTimer = setTimeout(function() {
          for (var i = 0; i < oThis.parentNode.children.length; i++) {
            oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
            (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none")
          };
          oUl[0].style.display = "block";
          oUl[0].style.top = oThis.offsetTop + "px";
          oUl[0].style.left = oThis.offsetWidth + "px";
          setWidth(oUl[0]);

          maxWidth = aDoc[0] - oUl[0].offsetWidth;
          maxHeight = aDoc[1] - oUl[0].offsetHeight;

          maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
          maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px")
        },300)
      }
    }
    aLi[i].onmouseout = function() {
      var oThis = this;
      var oUl = oThis.getElementsByTagName("ul");
      oThis.className = oThis.className.replace(/\s?active/,"");

      clearTimeout(showTimer);
      hideTimer = setTimeout(function(){
        for (var i = 0; i < oThis.parentNode.children.length; i++) {
          oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
          (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none")
        };
      },300)
    }
  };
  document.oncontextmenu = function(event) {
    var event = event || window.event;
    oMenu.style.display = "block";
    oMenu.style.top = event.clientY + "px";
    oMenu.style.left = event.clientX + "px";
    setWidth(aUl[0]);

    maxWidth = aDoc[0] - oMenu.offsetWidth;
    maxHeight = aDoc[1] - oMenu.offsetHeight;

    oMenu.offsetTop > maxHeight && (oMenu.style.top = maxHeight + "px");
    oMenu.offsetLeft > maxWidth && (oMenu.style.left = maxWidth + "px");

    return false;
  }
  document.onclick = function() {
    oMenu.style.display = "none"
  }
  function setWidth(obj) {
    maxWidth = 0;
    for (var i = 0; i < obj.children.length; i++) {
      var oLi = obj.children[i];
      var iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"]:getComputedStyle(oLi,null)["paddingLeft"]) *2;
      if(iWidth > maxWidth) maxWidth = iWidth
    };
    for (var i = 0; i < obj.children.length; i++) {
      obj.children[i].style.width = maxWidth + "px";
    };
  }
}
