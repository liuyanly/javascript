window.onload = function() {
  var oMenu = document.getElementById("menu");
  var aImg = oMenu.getElementsByTagName("img");
  // var iScale = 2;
  // var imgWidth = aImg[0].offsetWidth;
  // var imgHeight = aImg[0].offsetHeight;

  // for (var i = 0; i < aImg.length; i++) {
  //   aImg[i].style.width = imgWidth/iScale + "px";
  //   aImg[i].style.height = imgHeight/iScale + "px";
  //   aImg[i].onmouseover = function() {
  //     this.style.width = imgWidth + "px";
  //     this.style.height = imgHeight + "px";
  //   }
  //   aImg[i].onmouseout = function() {
  //     this.style.width = imgWidth/iScale + "px";
  //     this.style.height = imgHeight/iScale + "px";
  //   }
  // };
  var aWidth = [];
  //保存原宽度，并设置当前宽度
  for (var i = 0; i < aImg.length; i++) {
    aWidth.push(aImg[i].offsetWidth);
    aImg[i].width = parseInt(aImg[i].offsetWidth/2);
  };
  //鼠标移动事件
  document.onmousemove = function(event){
    var event = event || window.event;
    for (var i = 0; i < aImg.length; i++) {
      var a = event.clientX - aImg[i].offsetLeft - aImg[i].offsetWidth / 2;
      var b = event.clientY - aImg[i].offsetTop - oMenu.offsetTop - aImg[i].offsetHeight / 2;
      var iScale = 1 - Math.sqrt(a * a + b * b) / 300;
      if(iScale < 0.5) iScale = 0.5;
      aImg[i].width = aWidth[i] * iScale
    };
  }
}