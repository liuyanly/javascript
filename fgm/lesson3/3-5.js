window.onload = function() {
  var i = 0;
  var oBody = document.body;
  var timer;
  timer = setInterval(updateNum,1000);
  function updateNum(){
    oBody.innerHTML = ++i;
  }
  updateNum();
}