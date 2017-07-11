window.onload = function() {
  var oBox = document.getElementById("box");
  var aImg = oBox.getElementsByTagName("img");
  var oDiv = oBox.getElementsByTagName("div")[0];
  for (var i = 1; i < aImg.length; i++) {
    // aImg[i].index = i
    aImg[i].onmouseover = function() {
      // aImg[0].src = "img/big_"+this.index+".jpg"
      var img = new Image();
      img.src = aImg[0].src = this.src.replace("small","big");
      img.complete ? oDiv.style.display = "none" : (aImg[0].onload = function(){oDiv.style.display = "none"})
    }
  };
}