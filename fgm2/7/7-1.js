window.onload = function() {
  var oBox = document.getElementById("box");
  var oList = document.getElementsByTagName("ul")[0];
  var aLi = document.getElementsByTagName("li");
  var aTmp = [];
  var aBtn = null;
  var play = timer = null;
  var index = 0;
  var b0rder = true;
  //生成数字按钮
  for (var i = 0; i < aLi.length; i++) {
    aTmp.push("<li>"+(i+1)+"</li>")
  };
  //插入元素
  var oCount = document.createElement("ul");
  oCount.className = "count";
  oCount.innerHTML = aTmp.join("");
  oBox.appendChild(oCount);
  aBtn = document.getElementsByTagName("ul")[1].getElementsByTagName("li");

  for (var i = 0; i < aBtn.length; i++) {
    aBtn[i].index = i;
    aBtn[i].onmouseover = function() {
      show(this.index);
    }
  };
  show(index);
  function show(a) {
      for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].className = ""
      };
      aBtn[a].className = "current"
      startMove(-(aLi[0].offsetHeight * a));
  }

  function autoPlay(){
    b0rder ? index++ : index--;
    index <= 0 && (index = 0 , b0rder = true);
    index >= aBtn.length-1 && (index = aBtn.length-1, b0rder = false);
    show(index)
  }
  play = setInterval(autoPlay,3000);
  oBox.onmouseover = function() {
    clearInterval(play)
  }
  oBox.onmouseout = function() {
    play = setInterval(autoPlay,3000);
  }
  function startMove(iTarget){
    clearInterval(timer);
    timer = setInterval(function(){
      doMove(iTarget)
    },30)
  }
  function doMove(iTarget) {
      var iSpeed = (iTarget - oList.offsetTop) / 10;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      oList.offsetTop == iTarget ? clearInterval(timer):oList.style.top = oList.offsetTop + iSpeed + "px";
  }
}