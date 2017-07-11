window.onload = function() {
  var ainput = document.getElementsByTagName("input");
  var oA = document.getElementsByTagName("a")[0];
  var oLabel = document.getElementsByTagName("label")[0];

  function isCheckAll() {
    for (var i = 1, n=0; i < ainput.length; i++) {
      ainput[i].checked && n++
    };
    ainput[0].checked = n == ainput.length -1;
    oLabel.innerHTML = ainput[0].checked?"全不选":"全选"
  }
  ainput[0].onclick = function() {
    for (var i = 1; i < ainput.length; i++) {
      ainput[i].checked = true
    };
    isCheckAll();
  }
  oA.onclick = function() {
    for (var i = 1; i < ainput.length; i++) {
      ainput[i].checked = false
    };
    isCheckAll()
  }
  for (var i = 1; i < ainput.length; i++) {
    ainput[i].onclick = function() {
      isCheckAll()
    }
  };
}
