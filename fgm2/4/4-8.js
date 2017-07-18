var EventUtil = {
  addHandler: function(oElement, sEvent, fnHandler) {
    oElement.addEventListener?oElement.addEventListener(sEvent,fnHandler,false):
    oElement.attachEvent("on"+sEvent, fnHandler)
  },
  removeHandler: function(oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent,fnHandler,false):
    oElement.detachEvent("on"+sEvent,fnHandler)
  },
  addLoadHandler: function(fnHandler) {
    this.addHandler(window,"load",fnHandler)
  }
}
EventUtil.addLoadHandler(function(){
  var aInput = document.getElementsByTagName("input");

  EventUtil.addHandler(aInput[1],"click",function() {
    EventUtil.addHandler(aInput[0],"click",fnHandler);
    aInput[0].value = "我可以点击了"
  });

  EventUtil.addHandler(aInput[2], "click", function() {
    EventUtil.removeHandler(aInput[0],"click",fnHandler);
    aInput[0].value = "毫无用处的按钮"
  })
  function fnHandler() {
    alert("事件绑定成功!")
  }
})


