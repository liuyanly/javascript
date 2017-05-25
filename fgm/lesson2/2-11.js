// window.onload = function() {
//   var aLi = document.getElementById("box").getElementsByTagName("li");
//   var oLargeImg = aLi[0].getElementsByTagName("img")[0];
//   for (var i = 1; i < aLi.length; i++) {
//     aLi[i].index = i
//     aLi[i].onmouseover = function() {
//       oLargeImg.src = "img/big_"+ this.index + ".jpg";
//     }
//   };
// }
window.onload = function() {
  var oImg = document.getElementById("box").getElementsByTagName("img");
  var oDiv = document.getElementById("box").getElementsByTagName("div")[0];
  for (var i = 1; i < oImg.length; i++) {
    oImg[i].onmouseover = function(){
      var img = new Image();
      img.src = oImg[0].src = this.src.replace(/small/,"big");
      oDiv.style.display="block";
      img.complete ? oDiv.style.display="none":(oImg[0].onload = function(){ oDiv.style.display="none"})
    }
  };
}