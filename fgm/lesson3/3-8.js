window.onload = function() {
  var aSpan = document.getElementById("clock").getElementsByTagName("span");

  var timer;
  timer = setInterval(nowTime,1000)
  nowTime();
  function nowTime() {
    var myDate = new Date();
    aSpan[0].innerHTML= format(myDate.getHours());
    aSpan[1].innerHTML = format(myDate.getMinutes());
    aSpan[2].innerHTML = format(myDate.getSeconds());
  }
  function format(a) {
    return a.toString().replace(/^(\d)$/,"0$1")
  }
}