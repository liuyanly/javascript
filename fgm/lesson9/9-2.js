// window.onload = function() {
//   var oPhoto = document.getElementById("photo");
//   var aImg = oPhoto.getElementsByTagName("img");
//   var oBox =  document.getElementById("box");
//   var aLi = oBox.getElementsByTagName("li");
//   var oBtn = document.getElementsByTagName("input")[0];
//   var index = 0;
//   for (var i = 0; i < aImg.length; i++) {
//     aImg[i].index = i;
//     aImg[i].onclick = function(){
//       for (var i = 0; i < aImg.length; i++) {
//         aImg[i].className = "";
//       };
//       this.className = "selected";
//       createElem(this.index);
//     }
//     aImg[i].onmouseover = function() {
//       this.className += " hover";
//     }
//     aImg[i].onmouseout = function() {
//       this.className  = this.className.replace(/\shover/,"");
//     }
//   };
//   createElem(index);
//   function createElem(a){
//     oBox.style.background = "url(img/girl"+ a +"/"+ "bg.png" +")";
//     var aLi = document.createElement("li");
//     var oImg = document.createElement("img");
//   }
// }
var zIndex = 1;
window.onload = function() {
  var oPhoto = document.getElementById("photo");
  var aThumb = oPhoto.getElementsByTagName("img");
  var oBox =  document.getElementById("box");
  var aLi = oBox.getElementsByTagName("li");
  var oInput = document.getElementsByTagName("input")[0];
  var imgPath = 0;
  var oDateStart = null;
  var aPos = [];
  var aData = [];
  for (var i = 0; i < 15; i++) {
    aData.push(i+1);
  };
  //缩略图
  for (var i = 0; i < aThumb.length; i++) {
    aThumb[i].index = i;
    aThumb[i].onmouseover = function() {
      this.className += " hover";
    }
    aThumb[i].onmouseout = function() {
      this.className  = this.className.replace(/\shover/,"");
    }
    aThumb[i].onclick = function(){
      for (var i = 0; i < aThumb.length; i++) {
        aThumb[i].className = "";
      };
      this.className = "selected";
      imgPath = this.index;
      oBox.innerHTML = "";
      oInput.value = "开始游戏";
      createMask();
      aData.sort(function(a,b) {return a-b});
      GAME(false)
    }
  };
  //创建遮罩层
  function createMask() {
    var oMask = document.createElement("div");
    oMask.id = "mask";
    oMask.style.zIndex = zIndex;
    oBox.appendChild(oMask)
  }
  createMask();

  //游戏处理函数
  function GAME(ran) {
    //随机排列数组
    ran && aData.sort(function(a,b) {return Math.random() > 0.5 ? -1 : 1});

    //插入结构
    var oFragment = document.createDocumentFragMent();
    for (var i = 0; i < aData.length; i++) {
      var oLi = document.createElement("li");
      var oImg = document.createElement("img");
      oImg.src = "img/girl" + imgPath + "/" + aData[i]+ ".png";
      oLi.appendChild(oImg);
      oFragment.appendChild(oLi);
    };
    oBox.appendChild(oFragment);
    oBox.style.background = "url(img/girl"+ imgPath + "/bg.png) no-repeat";

    //布局转换
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      aLi[i].style.top = aLi[i].offsetTop + "px";
      ali[i].style.left = aLi[i].offsetLeft + "px";
      aPos.push({"left": aLi[i].offsetLeft, "top": aLi[i].offsetTop})
    };
  }
}