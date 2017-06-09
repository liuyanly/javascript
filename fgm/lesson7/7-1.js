function getByClass(sclass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sclass + "( |$)");
  var aElem = getTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i]) && aClass.push(aElem[i])
  };
  return aClass;
}
function getTagName(elem, obj) {
  return (obj || document).getElementsByTagName(elem);
}
window.onload = function() {
  var oBox = document.getElementById("box");
  var olist = document.getElementsByTagName("ul")[0];
  var aImg = olist.getElementsByTagName("img");
  var timer = playTimer = null;
  var index = 0;
  var bOrder = true;
  var aTmp = [];
  var aBtn = null;

  // 生成数字按钮
  for (var i = 0; i < aImg.length; i++) {
    aTmp.push("<li>" + (i + 1) + "</li>");
  };
  // 插入元素
  var oCount = document.createElement("ul");
  oCount.className = "count";
  oCount.innerHTML = aTmp.join("");
  oBox.appendChild(oCount);
  aBtn = oBox.getElementsByTagName("ul")[1].getElementsByTagName("li");
  //初始化状态
  show();
  //点击按钮切换
  for (var i = 0; i < aBtn.length; i++) {
    aBtn[i].index = i;
    aBtn[i].onmouseover = function() {
      index = this.index
      show();
    }
  };

  //焦点图展示
  function show(){
    for (var i = 0; i < aBtn.length; i++) {
      aBtn[i].className = "";
    };
    aBtn[index].className = "current";
    startMove(-(index * aImg[0].offsetHeight));
  }

  function next() {
    bOrder ? index++ : index--;
    index <= 0 && (index = 0, bOrder = true);
    index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false)
    show()
  }

  playTimer = setInterval(next,3000)

  //鼠标移入展示区停止自动播放
  oBox.onmouseover = function () {
    clearInterval(playTimer)
  }

  //鼠标离开展示区开始自动播放
  oBox.onmouseout = function () {
    playTimer = setInterval(next,3000)
  }
  function startMove(iTarget) {
    clearInterval(timer);
    timer = setInterval(function(){
      doMove(iTarget)
    },30)
  }
  function doMove(iTarget) {
    var iSpeed = (iTarget - olist.offsetTop) / 10;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    olist.offsetTop == iTarget ? clearInterval(timer) : olist.style.top = olist.offsetTop + iSpeed + "px"
  }
}