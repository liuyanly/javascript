function getStyle(obj,attr){
  return  obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr]
}
window.onload = function() {
  var oBig = document.getElementById("big");
  var oMaskL = document.getElementById("masks_L");
  var oMaskR = document.getElementById("masks_R");
  var oBtnL = document.getElementById("btn_L");
  var oBtnR = document.getElementById("btn_R");
  var oTitle = document.getElementById("title");
  var oSpan = oTitle.getElementsByTagName("span")[0];
  var index = 0;
  var playTimer = null;
  var b0rder = true;
  var aData = [
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg", "title" : "7月26日，吊车将事故现场的车头残片吊至大型运输车辆上。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/105/238/825/53706420.jpg", "title" : "7月26日，一辆大卡车准备驶离事故现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg", "title" : "7月26日，一名工人在事故现场最后一节车厢上作业。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/100/238/825/53706415.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"}
  ];
  //鼠标划过/离开显示左右箭头
  oMaskL.onmouseover = oBtnL.onmouseover = function() {
    startMove(oBtnL,"opacity",100)
    clearInterval(playTimer);
  }
  oMaskL.onmouseout = oBtnL.onmouseout = function() {
    startMove(oBtnL,"opacity",0)
    playTimer = setInterval(autoPlay,2000)
  }
  oMaskR.onmouseover = oBtnR.onmouseover = function() {
    startMove(oBtnR,"opacity",100)
    clearInterval(playTimer);
  }
  oMaskR.onmouseout = oBtnR.onmouseout = function() {
    startMove(oBtnR,"opacity",0)
    playTimer = setInterval(autoPlay,2000)
  }
  //左右箭头点击
  oBtnL.onclick = oBtnR.onclick = function() {
    b0rder ? index++: index--;
    index <= 0 && (index = 0,b0rder = true);
    index >= aData.length - 1 && (index = aData.length-1,b0rder = false);
    loadImg();
  }
  //自动播放
  function autoPlay(){
    clearInterval(playTimer);
    playTimer= setInterval(function(){
      b0rder?index++:index--;
      index <= 0 && (index = 0,b0rder = true);
      index >= aData.length - 1 && (index = aData.length-1,b0rder = false);
      loadImg()
    },2000)
  }
  autoPlay()

  function startMove(obj, attr, iTarget, fnEnd){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      doMove(obj, attr, iTarget, fnEnd);
    },30)
  }
  function doMove(obj, attr, iTarget, fnEnd){
    var iCur = parseFloat(getStyle(obj,attr));
    if(attr == "opacity") {
      iCur = parseInt(iCur * 100);
    }
    var iSpeed = (iTarget - iCur)/5;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);

    if(iCur == iTarget) {
      clearInterval(obj.timer);
      fnEnd && fnEnd()
    }else{
      if(attr == "opacity") {
        obj.style.opacity = (iCur+iSpeed)/100;
        obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
      }else{
        obj.style[attr] = iCur+iSpeed+"px"
      }
    }
  }
  loadImg();
  //加载图片
  function loadImg() {
    oBig.className = "loading";
    oSpan.style.opacity = oTitle.style.height = 0;
    oSpan.style.filter = "alpha(opacity=0)";
    var oImg = oBig.getElementsByTagName("img");
    oImg[0] && oBig.removeChild(oImg[0]);
    var img = document.createElement("img");
    var oNewImg = new Image();
    oNewImg.onload = function() {
      oBig.className = "";
      img.src = this.src;
      oBig.appendChild(img);
      img.style.width = (img.offsetWidth > 800 ? 800: img.offsetWidth) + "px";
      oBig.style.height = img.style.height = img.offsetHeight * img.offsetWidth / img.offsetWidth + "px";
      img.style.opacity = 0;
      img.style.filter = "alpha(opacity=0)";
      oSpan.innerHTML = aData[index].title;
      startMove(img,"opacity",100,function(){
        startMove(oTitle,"height",50,function(){
          startMove(oTitle.childNodes[0],"opacity",100)
        });
      })
    }
    oNewImg.src = aData[index].imgSrc;
  }
}
