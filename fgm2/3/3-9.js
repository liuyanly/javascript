window.onload = function() {
  var oCountdown = document.getElementById("countdown");
  var aSpan = oCountdown.getElementsByTagName("span");
  var oBtn = oCountdown.getElementsByTagName("input")[0];
  var timer = null;
  oBtn.onclick = function() {
    this.className == "" ? (timer = setInterval(updateTime,1000),updateTime()):
    (clearInterval(timer));
    this.className = this.className == "" ? "cancel": ""

  }
  function updateTime(){
      var oRemain = aSpan[0].innerHTML.replace(/^0/,"") * 60 + parseInt(aSpan[1].innerHTML.replace(/^0/,""));
      if(oRemain <= 0){
        clearInterval(timer);
        return
      }
      oRemain--;
      aSpan[0].innerHTML = format(parseInt(oRemain/60));
      oRemain %= 60;
      aSpan[1].innerHTML = format(parseInt(oRemain));
    }
    function format(a){
      return a.toString().replace(/^(\d)$/,"0$1")
    }
}