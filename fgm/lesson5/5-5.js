window.onload = function() {
  var aLi = document.getElementsByTagName("li");
  var oBig = document.getElementById("big");
  var oLoad = oBig.getElementsByTagName("div")[0];
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].index = i;
    aLi[i].onmouseover = function() {
      var oImg = document.createElement("img");
      // 图片预加载
      var img = new Image();
      img.src = oImg.src = aLi[this.index].getElementsByTagName("img")[0].
      src.replace(".jpg","_big.jpg");
      // 插入大图
      oBig.appendChild(oImg);
      this.className = "active";
      //显示big
      oBig.style.display = oLoad.style.display = "block";
      //判断大图是否成功
      img.complete ? oLoad.style.display = "none" : (oImg.onload = function() {
        oLoad.style.display = "none"
      })
    }
    aLi[i].onmousemove = function(event) {
      var event = event || window.event;
      var iWidth = document.documentElement.offsetWidth - event.clientX;
      //设置big的top值
      oBig.style.top = event.clientY + 20 + "px";
      // 设置big的left值 ，如果右侧显示区域不够，大图将在鼠标左侧显示.
      oBig.style.left = (iWidth < oBig.offsetWidth + 10 ? event.clientX -
        oBig.offsetWidth - 10 : event.clientX + 10) + "px";
    }
    // 鼠标离开，删除大图并隐藏大图容器
    aLi[i].onmouseout = function() {
      this.className = "";
      oBig.style.display = "none";
      //移除大图片
      oBig.removeChild(oBig.lastChild)
    }
  };

}