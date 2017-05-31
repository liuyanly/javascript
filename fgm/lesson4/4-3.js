window.onload = function(){
  var oBox = document.getElementById("box");
  var oList = document.getElementsByTagName("ul")[0].getElementsByTagName("li");
  var oCount = document.getElementsByTagName("ul")[1].getElementsByTagName("li");
  var timer = paly = null;
  var index = 0;
  var bOrder = true;

  // 按钮切换
  for (var i = 0; i < oCount.length; i++) {
    oCount[i].index = i;
    oCount[i].onmouseover = function() {
      show(this.index);
    }
  };
  // 鼠标滑过清除定时器
  oBox.onmouseover = function() {
    clearInterval(play);
  };
  // 鼠标离开启动自动播放
  oBox.onmouseout = function() {
    autoplay()
  }
  // 自动播放函数
  function autoplay() {
    play = setInterval(function(){
      // 判断播放顺序
      bOrder?index++:index--;
      // 正序
      index >= oList.length && (index = oList.length - 2, bOrder = false);
      // 倒序
      index <= 0 && (index = 0,bOrder = true)
      // 调用函数
      show(index);
    },2000)
  }
  autoplay(); //应用
  // 图片切换，淡入淡出效果
  function show(a){
    var index = a;
    var alpha = 0;
    for (var i = 0; i < oCount.length; i++) {
      oCount[i].className = " ";
    };
    oCount[index].className = "current";

    for (var i = 0; i < oList.length; i++) {
      oList[i].style.opacity = 0;
      oList[i].style.filter = "alpha(opacity=0)"
    };
    timer = setInterval(function(){
      alpha += 2;
      alpha >= 100 &&(alpha= 100);
      oList[index].style.opacity = alpha/100;
      oList[index].style.filter = "alpha(opacity="+alpha+")";
      alpha == 100 && clearInterval(timer);
    },20)
  }
}