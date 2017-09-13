window.onload = function(){
  var oMenu = document.getElementById("menu");
  var aImg = oMenu.getElementsByTagName("img");
  var aWidth = [];
  for (var i = 0; i < aImg.length; i++) {
    aWidth.push(aImg[i].offsetWidth);
    aImg[i].width = parseInt(aImg[i].offsetWidth / 2)
  };
  document.onmousemove = function(event) {
    var event = event || window.event;
    for (var i = 0; i < aImg.length; i++) {
      var a = event.clientX - aImg[i].offsetLeft - aImg[i].offsetWidth / 2;
      var b = event.clientY - oMenu.offsetTop - aImg[i].offsetTop - aImg[i].offsetHeight / 2;
      var iScale = 1 - Math.sqrt(a * a + b * b) / 300;
      if (iScale < 0.5) { iScale = 0.5};
      aImg[i].width = aWidth[i] * iScale;
    };

  }
}