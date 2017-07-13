window.onload = function() {
  var oClock = document.getElementById("clock");
  var aSpan = oClock.getElementsByTagName("span");
  var timer = null;
  timer = setInterval(nowDate, 1000);
  nowDate();
  function nowDate(){
    var myDate = new Date();
    var aDate = [myDate.getHours(),myDate.getMinutes(),myDate.getSeconds()];
    for(var i in aDate) aSpan[i].innerHTML = format(aDate[i])
  }
  function format(a) {
    return a.toString().replace(/^(\d)$/,"0$1")
  }
}