function getByClass(sclass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sclass + "( |$)");
  var aElem = getTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i]) && aClass.push(aElem[i])
  };
  return aClass;
}
function getTagName(elem, obj) {
  return (obj || document).getElementsByTagName(elem);
}
window.onload = function() {
  var oBox = document.getElementById("box");
  var alist = document.getElementsByTagName("ul")[0].getElementsByTagName("img");
  // 插入元素
  var oCount = document.createElement("ul");
  oCount.className = "count";
  oBox.appendChild(oCount);
  for (var i = 0; i < alist.length; i++) {
    var aLiCount = document.createElement("li");
    oCount.appendChild(aLiCount)
    aLiCount.innerHTML = i + 1;
  };

  var aCount = getByClass("count", oBox);
  var aLiCount = getTagName("li",aCount[0]);
  console.log(aLiCount)
  for (var i = 0; i < aLiCount.length; i++) {
    aLiCount[i].onmoueover = function() {
      this.className = "current";
    }
    aLiCount[i].onmouseout = function() {
      this.className = "";;
    }
  };
}