window.onload = function() {
  var oBox = document.getElementById("box");
  var oH2 = oBox.getElementsByTagName("h2")[0];
  var oA = oBox.getElementsByTagName("a")[0];
  var aSpan = oBox.getElementsByTagName("span");
  var disX = disY = 0;
  var bDrag = false;
  var aPos = [{x:oBox.offsetLeft, y:oBox.offsetTop}];
  oH2.onmousedown = function(event) {
    var event = event || window.event;
    bDrag = true;
    disX = event.clientX - oBox.offsetLeft;
    disY = event.clientY - oBox.offsetTop;

    aPos.push({x:oBox.offsetLeft,y:oBox.offsetTop});

    this.setCapture && this.setCapture();

    return false;
  }
  document.onmousemove = function(event) {
    if(!bDrag) return;
    var event = event || window.event;
    var iL = event.clientX - disX;
    var iT = event.clientY - disY;
    var maxL = document.documentElement.clientWidth - oBox.offsetWidth;
    var maxT = document.documentElement.clientHeight - oBox.offsetHeight;

    iL = iL < 0 ? 0 : iL;
    iL = iL > maxL ? maxL : iL;
    iT = iT < 0 ? 0 : iT;
    iT = iT > maxT ? maxT : iT;

    oBox.style.marginLeft = oBox.style.marginTop = 0;
    oBox.style.left = iL + "px";
    oBox.style.top = iT + "px";

    aPos.push({x:iL,y:iT});

    status();
    return false
  }
  document.onmouseup = window.onblur = oH2.onlosecapture = function(){
    bDrag = false;
    oH2.releaseCapture && oH2.releaseCapture();
    status();
  }
  oA.onclick = function() {
    if(aPos.length == 1) return;
    var timer = setInterval(function(){
      var oPos = aPos.pop();
      oPos ? (oBox.style.left = oPos.x + "px", oBox.style.top = oPos.y + "px",status()):clearInterval(timer)
    },30);

    this.focus = false;

    return false;
  }
  oA.onmousedown = function(event) {
    (event || window.event).cancelBubble = true
  }
  function status(){
    aSpan[0].innerHTML = bDrag;
    aSpan[1].innerHTML = oBox.offsetTop;
    aSpan[2].innerHTML = oBox.offsetLeft;
  }
  status()
}