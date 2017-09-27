window.onload= function(){
  var oWrap = document.getElementById("wrap");
  var oBtn = oWrap.getElementsByTagName("input")[0];
  var oBox = oWrap.getElementsByTagName("span")[0];
  var aData = [
    {width:20, height:20},
    {width:80, height:80},
    {left:10}, {left:408},
    {opacity:100},
    {opacity:0},
    {opacity:100},
    {width:80, height:80, left:408},
    {top:10},
    {width:20, height:20, left:468},
    {top:70},
    {left:10},
    {top:10},
    {left:468},
    {width:20, height:20, left:468},
    {width:80, height:80, left:408}
  ];
  var bOrder = true;
  var i = 0;
  oBtn.disabled = false;
  // 点击按钮事件(开始/返回)
  oBtn.onclick = function(){
    this.disabled = true;
    function begin(){
      bOrder ? i++ : i--;
      doMove(oBox,aData[i],begin)
      if(i == aData.length || i < 0 ) {
        clearInterval(oBox.timer);
        bOrder = !bOrder;
        oBtn.value = bOrder ? "开始":"原路返回";
        oBtn.disabled = false;
        return;
      }
    }
    begin()
  }
  //去除按钮虚线
  oBtn.onfoucs = function(){
    this.blur();
  }
}
function css(element,attr,value){
  if(arguments.length == 2){
    return parseFloat(element.currentStyle?element.currentStyle[attr]:getComputedStyle(element,null)[attr])
  }else if(arguments.length == 3) {
    attr == "opacity" ? (element.style.filter = "alpha(opacity="+value+")",element.style.opacity = value / 100):element.style[attr] = value + "px"
  }
}
function doMove(element,options,callback){
  clearInterval(element.timer);
  element.timer = setInterval(function(){
    var bComplete = true;
    for (var p in options) {
      var iCur = p == "opacity"?parseInt(css(element,p).toFixed(2)*100):css(element,p);
      var iSpeed = (options[p] - iCur)/5;
      iSpeed = iSpeed>0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
      options[p] == iCur || (bComplete = false, css(element,p,iCur+iSpeed))
    }
    bComplete && (clearInterval(element.timer),callback && callback.call(this))
  },30)
}