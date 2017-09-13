window.onload = function(){
  var aBtn = document.getElementsByTagName("input");
  var oP = document.getElementsByTagName("p")[0];
  var oDiv = document.getElementsByTagName("div")[0];
  aBtn[0].onclick = function(event){
    (event || window.event).cancelBubble = true;
    clearEvent();
    this.value += " (已激活)";
    oP.innerHTML = "鼠标点击页面， 人物将移动至鼠标位置！";
    document.onclick = function(event) {
      var event = event || window.event;
      oDiv.style.background="url(img/2.gif) no-repeat"
      startMove(oDiv,{x:event.clientX,y:event.clientY},function(){
        oDiv.style.background="url(img/1.gif) no-repeat"
      })
      return false;
    }
  }
  aBtn[1].onclick = function(event){
    (event || window.event).cancelBubble = true;
    clearEvent();
    this.value += " (已激活)";
    oP.innerHTML = "按住鼠标左键，在页面划动，人物将按照鼠标轨迹移动！";
    var aPos = [{x:oDiv.offsetLeft,y:oDiv.offsetTop}];
    document.onmousedown = function(event){
      var event = event || window.event;
      aPos.push({x:event.clientX,y:event.clientY});
      document.onmousemove = function(event) {
        var event = event || window.event;
        aPos.push({x:event.clientX,y:event.clientY});
        return false;
      }
      return false
    }
    document.onmouseup = function(){
      document.onmousedown = null;
      oDiv.style.background = "url(img/2.gif) no-repeat";
      var timer = setInterval(function(){
        if (aPos.length == 0) {
          clearInterval(timer);
          oDiv.style.background = "url(img/1.gif) no-repeat";
          return
        };
        oDiv.style.left = aPos[0].x + "px";
        oDiv.style.top = aPos[0].y + "px";
        aPos.shift();
      },30)
    }
  }
  function clearEvent(){
    document.onclick = null;
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    for (var i = 0; i < aBtn.length; i++) {
      aBtn[i].value = aBtn[i].value.replace(" (已激活)","");
      aBtn[i].onmousedown = aBtn[i].onmouseup = function(event){
        (event || window.event).cancelBubble = true;
      }
    };
  }
  function startMove(obj,iTarget,fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      doMove(obj,iTarget,fnEnd)
    },30)
  }
  function doMove(obj,iTarget,fnEnd){
    var iX = (iTarget.x - obj.offsetLeft) / 5;
    var iY = (iTarget.y - obj.offsetTop) / 5;
    iX = iX > 0 ? Math.ceil(iX):Math.floor(iX);
    iY = iY > 0 ? Math.ceil(iY):Math.floor(iY);
    if(iTarget.x == obj.offsetLeft && iTarget.y == obj.offsetTop){
      clearInterval(obj.timer);
      fnEnd && fnEnd();
    }else{
      obj.style.left = obj.offsetLeft + iX + "px";
      obj.style.top = obj.offsetTop + iY + "px";
    }
  }
}