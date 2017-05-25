window.onload = function(){
  var aInput = document.getElementsByTagName("input");
  var invert = document.getElementsByTagName("a")[0];
  var label = document.getElementsByTagName("label")[0];
  function isCheckAll(){
    for (var i = 1, n = 0; i < aInput.length; i++) {
      aInput[i].checked && n++
    };
    aInput[0].checked = n == aInput.length -1;
    label.innerHTML = aInput[0].checked?"全不选":"全选"
  }
  // 全选/全不选
  aInput[0].onclick = function() {
    for (var i = 1; i < aInput.length; i++) {
      aInput[i].checked = this.checked
    };
    isCheckAll()
  }
  // 反选
  invert.onclick = function(){
    for (var i = 1; i < aInput.length; i++) {
      aInput[i].checked = !aInput[i].checked
    };
    isCheckAll()
  }
  // 根据复选个数更新全选框状态
  for (var i = 1; i < aInput.length; i++) {
    aInput[i].onclick = function() {
      isCheckAll();
    }
  };
}