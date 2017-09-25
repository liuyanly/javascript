window.onload = function(){
  var oBox = document.getElementById("box");
  var oUl = oBox.getElementsByTagName("ul")[0];
  var aLi = oUl.getElementsByTagName("li");
  var timer = null;
  var autoPlay = null;
  var index = 0;
  // 创建小圆点
  var oCount = document.createElement("ul");
  var oFragMent = document.createDocumentFragment();
  oCount.className = "count";
  for (var i = 0; i < aLi.length; i++) {
    var oLi = document.createElement("li");
    oLi.innerHTML = i+1;
    oFragMent.appendChild(oLi)
  }
  oCount.appendChild(oFragMent);
  oBox.appendChild(oCount);
  var aCount = oCount.getElementsByTagName("li");
  aCount[0].className = "current";
  // 鼠标移动切换
  for (var i = 0; i < aCount.length; i++) {
    aCount[i].index = i;
    aCount[i].onmouseover = function(){
      show(this.index);
    }
  }
  // 自动播放
  function auto(){
    index ++;
    index == aLi.length && (index = 0);
    show(index)
  }
  autoPlay = setInterval(function(){
    auto()
  },3000)
  oBox.onmouseover = function(){
    clearInterval(autoPlay)
  }
  oBox.onmouseout = function(){
    autoPlay = setInterval(function(){
      auto()
    },3000)
  }
  // 显示当前的函数
  function show(a){
    for (var i = 0; i < aCount.length; i++) {
      aCount[i].className = "";
    }
    aCount[a].className = "current";
    // oUl.style.top = -aLi[0].offsetHeight*a + "px";
    doMove(-aLi[0].offsetHeight*a)
  }
  // 运动函数
  function doMove(iTarget){
    clearInterval(timer);
    timer = setInterval(function(){
      var iSpeed = (iTarget - oUl.offsetTop)/5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
      iTarget == oUl.offsetTop ? clearInterval(timer):oUl.style.top = iSpeed + oUl.offsetTop + "px"
    },30)
  }
}