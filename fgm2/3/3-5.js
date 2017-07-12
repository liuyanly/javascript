window.onload = function () {
  var count = 0;
  var timer = null;
  var oBody = document.body;
  timer = setInterval(addSelf,1000)
  function addSelf(){
    oBody.innerHTML = ++count;
  }
  addSelf();
}