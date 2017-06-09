function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
}
window.onload = function() {
  var oBig = document.getElementById("big");
  var oMasksL = document.getElementById("masks_L");
  var oMasksR = document.getElementById("masks_R");
  var oBtnL = document.getElementById("btn_L");
  var oBtnR = document.getElementById("btn_R");
  var oTitle = document.getElementById("title");
  var oSpan = document.getElementsByTagName("span")[0];
  var iNow = 0;
  var aData = [
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg", "title" : "7月26日，吊车将事故现场的车头残片吊至大型运输车辆上。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/105/238/825/53706420.jpg", "title" : "7月26日，一辆大卡车准备驶离事故现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg", "title" : "7月26日，一名工人在事故现场最后一节车厢上作业。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/100/238/825/53706415.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"}
  ]

  oMasksL.onmouseover = oBtnL.onmouseover = function() {
    startMove(oBtnL,"opacity",100)
  }
  oMasksL.onmouseout = oBtnL.onmouseout =function() {
    startMove(oBtnL,"opacity",0)
  }

  oMasksR.onmouseover = oBtnR.onmouseover = function() {
    startMove(oBtnR,"opacity",100)
  }
  oMasksR.onmouseout =  oBtnR.onmouseout = function() {
    startMove(oBtnR,"opacity",0)
  }
  function startMove(obj, attr, iTarget, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
      doMove(obj,attr,iTarget,fnEnd)
    },30)
  }
  function doMove(obj,attr,iTarget,fnEnd) {
    var iCur = parseFloat(getStyle(obj, attr));
    if(attr == "opacity") {
      iCur = parseInt(iCur * 100)
    }
    var iSpeed = (iTarget - iCur) / 5;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

    if(iTarget == iCur) {
      clearInterval(obj.timer);
      fnEnd && fnEnd();
    }else{
      if(attr == "opacity") {
        obj.style.filter = "alpha(opacity="+(iCur + iSpeed)+")";
        obj.style.opacity = (iCur + iSpeed) / 100;
      }else{
        obj.style[attr] = iCur + iSpeed + "px";
      }
    }
  }
  oBtnL.onclick = function() {
    if(iNow <= 0) {
      alert("前面没有图片了！")
      return
    }
    iNow--;
    loadImg();
  }
  oBtnR.onclick = function() {
    if(iNow >= aData.length - 1) {
      alert("这是最后一张图片了！")
      return
    }
    iNow++;
    loadImg();
  }
  loadImg()
  function loadImg() {
    oBig.className = "loading";
    oSpan.style.opacity = oTitle.style.height = 0;
    oSpan.style.filter = "alpha(opacity=0)";
    var oImg = oBig.getElementsByTagName("img");
    oImg[0] && oBig.removeChild(oImg[0]);
    var oTemp = document.createElement("img");
    var oNewImg = new Image();
    oNewImg.onload = function() {
      oBig.className = "";
      oTemp.src = this.src;
      oBig.appendChild(oTemp);
      oTemp.style.width = (oTemp.offsetWidth > 800 ? 800: oTemp.offsetWidth) + "px";
      oBig.style.height = oTemp.style.height = oTemp.offsetHeight * oTemp.offsetWidth / oTemp.offsetWidth + "px";
      oSpan.innerHTML = aData[iNow].title;
      startMove(oTitle,"height",50,function(){
        startMove(oTitle.childNodes[0],"opacity",100)
      })
    }
    oNewImg.src = aData[iNow].imgSrc
  }
}