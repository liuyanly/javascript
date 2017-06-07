function getId(id) {
  return typeof id === "string" ? document.getElementById(id) : id
}
function getTagName(elem,obj) {
  return (obj || document).getElementsByTagName(elem);
}
function getByClass(sClass,oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = getTagName("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass
}
window.onload = function () {
  var oBox = getId("box");
  var oList = getByClass("list", oBox)[0];
  var oCount = getByClass("count",oBox)[0];
  var aImg = getTagName("li",oList);
  var aNum = getTagName("li",oCount);
  var timer = play = null;
  var index = 0;
  // 按钮切换
  for (var i = 0; i < aNum.length; i++) {
    aNum[i].index = i;
    aNum[i].onmouseover = function(){
      show(this.index);
    }
  };
  // 鼠标滑过关闭定时器
  oBox.onmouseover = function() {
    clearInterval(play);
  }
  // 鼠标离开启动自动播放
  oBox.onmouseout = function(){
    autoplay();
  }
  // 自动播放函数
  function autoplay(){
    play = setInterval(function(){
      index++;
      index >= aImg.length && (index=0)
      show(index);
    },2000)
  }
  autoplay(); //应用
  // 图片切换，淡入淡出效果
  function show(a) {
    index = a;
    var alpha = 0;
    for (var i = 0; i < aNum.length; i++) {
      aNum[i].className = ""
    };
    aNum[index].className = "current";
    clearInterval(timer)

    for (var i = 0; i < aImg.length; i++) {
      aImg[i].style.opacity = 0;
      aImg[i].style.filter = "alpha(opacity=0)"
    };

    timer = setInterval(function(){
      alpha += 2;
      alpha > 100 && (alpha =100);
      aImg[index].style.opacity = alpha/100;
      aImg[index].style.filter = "alpha(opacity="+alpha+")";
      alpha == 100 && clearInterval(timer)
    },20)
  }
}