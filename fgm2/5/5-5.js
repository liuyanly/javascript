window.onload = function() {
  var oBox = document.getElementById("box");
  var aLi = oBox.getElementsByTagName("li");
  var oBig = document.getElementById("big");
  var oDiv = oBig.getElementsByTagName("div")[0];

  for (var i = 0; i < aLi.length; i++) {
    aLi[i].index = i;
    aLi[i].onmouseover = function() {
      var oImg = document.createElement("img");
      var img = new Image();
      img.src = oImg.src = aLi[this.index].getElementsByTagName("img")[0].src.replace(".jpg","_big.jpg")
      oBig.appendChild(oImg);
      this.className = "active";
      oBig.style.display = oDiv.style.display = "block";
      img.complete ? oDiv.style.display = "none":(oImg.onload = function(){oDiv.style.display = "none"})
    }
    aLi[i].onmousemove = function(event) {
      var event = event || window.event;
      var iWidth = document.documentElement.offsetWidth - event.clientX;
      oBig.style.top = event.clientY+20+"px";
      oBig.style.left = (iWidth < oBig.offsetWidth+10 ? event.clientX - oBig.offsetWidth - 10: event.clientX + 10)+"px"
    }
    aLi[i].onmouseout = function() {
      this.className = "";
      oBig.style.display = "none";
      oBig.removeChild(oBig.lastChild)
    }
  };
}