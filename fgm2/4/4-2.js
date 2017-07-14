window.onload = function() {
  var oBox = document.getElementById("box");
  var oList = oBox.getElementsByTagName("ul")[0];
  var aList = oList.getElementsByTagName("li");
  var oCount = oBox.getElementsByTagName("ul")[1];
  var aCount = oCount.getElementsByTagName("li");
  var timer = play = null;
  var index = 0;
  for (var i = 0; i < aCount.length; i++) {
    aCount[i].index = i;
    aCount[i].onmouseover = function() {
      show(this.index);
    }
  };
  oBox.onmouseover = function() {
    clearInterval(play);
  }
  oBox.onmouseout = function() {
    autoPlay();
  }
  function autoPlay() {
    play = setInterval(function(){
      index++;
      index >= aList.length && (index = 0)
      show(index);
    },2000)
  }
  autoPlay();
  function show(a) {
    index = a;
    var alpha = 0;

    for (var n = 0; n < aCount.length; n++) {
      aCount[n].className = ""
    };
    aCount[index].className = "current";
    clearInterval(timer);

    for (var n = 0; n < aList.length; n++) {
      aList[n].style.opacity = 0;
      aList[n].style.filter = "alpha(opacity=0)";
    };
    timer = setInterval(function(){
      alpha += 2;
      alpha > 100 && (alpha = 100);
      aList[index].style.opacity = alpha / 100;
      aList[index].style.filter = "alpha(opacity"+alpha+")";
      alpha == 100 && clearInterval(timer)
    },20)
  }
}