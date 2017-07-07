// window.onload = function() {
//   var aLi = document.getElementsByTagName("li");
//   for (var i = 0; i < aLi.length; i++) {
//     aLi[i].onmouseover = function() {
//       var oImg = this.getElementsByTagName("img")[0];
//       oImg.style.display = "block";
//       oImg.className = "zindex";
//     }
//     aLi[i].onmouseout = function() {
//       var oImg = this.getElementsByTagName("img")[0];
//       oImg.style.display = "none";
//       oImg.className = "";
//     }
//   };
// }
window.onload = function() {
  var aLi = document.getElementsByTagName("li");
  var oA = document.getElementsByTagName("a");
  var oImg = document.getElementsByTagName("img");
  for (var i = 0; i < aLi.length; i++) {
    oA[i].index = oImg[i].index = i;
    oA[i].onmouseover = function() {
      aLi[this.index].className = "zindex";
      oImg[this.index].style.display = "block";
    }
    oA[i].onmouseout = function() {
      aLi[this.index].className = "";
      oImg[this.index].style.display = "none";
    }
    oImg[i].onmouseover = function() {
      aLi[this.index].className = "zindex";
      this.style.display = "block";
    }
    oImg[i].onmouseout = function() {
      aLi[this.index].className = "";
      this.style.display = "none";
    }
  };
}