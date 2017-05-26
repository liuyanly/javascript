window.onload = function() {
  var aSpan = document.getElementsByTagName("span");
  var oBtn = document.getElementsByTagName("input")[0];
  var timer = null;
  oBtn.onclick = function() {
    this.className == ""?(timer=setInterval(updateTIme,1000),updateTIme()):
    (clearInterval(timer));
    this.className= this.className==""?"cancel":"";
  }
  function format(a){
    return a.toString().replace(/^(\d)$/,'0$1')
  }
  function updateTIme() {
    var oRemain = aSpan[0].innerHTML.replace(/^0/,"")*60 + parseInt(aSpan[1].
      innerHTML.replace(/^0/,''));
    if(oRemain <= 0){
      clearInterval(timer);
      return
    }
    oRemain--;
    aSpan[0].innerHTML =format(parseInt(oRemain/60));
    oRemain %= 60;
    aSpan[1].innerHTML = format(parseInt(oRemain))
  }

}