window.onload=function(){
  var oBox = document.getElementById("box");
  var oPrev = document.getElementsByTagName("span")[0];
  var oNext = document.getElementsByTagName("span")[1];
  var oUl = document.getElementsByTagName("ul")[0];
  var aLi = document.getElementsByTagName("li");
  var iHeight = aLi[0].offsetHeight;
  var timer = null;
  oPrev.onclick = function(){
    oUl.insertBefore(aLi[aLi.length-1],aLi[0]);
    oUl.style.top = -iHeight + "px";
    doMove(0);
  }
  oNext.onclick = function(){
    doMove(-iHeight, function(){
      oUl.appendChild(aLi[0]);
      oUl.style.top = 0;
    })
  }
  function doMove(iTarget, callBack){
    clearInterval(timer);
    timer = setInterval(function(){
      var iSpeed = (iTarget - oUl.offsetTop) / 5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
      oUl.offsetTop == iTarget ? (clearInterval(timer),callBack && callBack.apply(this)):oUl.style.top = iSpeed + oUl.offsetTop + "px";
    },30)
  }
}