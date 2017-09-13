function randomRange (lower, uper) {
  return Math.floor(Math.random()*(uper - lower + 1)+lower)
}
function getRanColor (){
  var str = randomRange(0,0xFFFFFF).toString(16);
  while(str.length < 6) str = "0"+str;
  return "#"+str;
}
function on(element,type,handler){
  return element.addEventListener?element.addEventListener(type,handler,false):attachEvent("on"+type,handler);
}
function manual(event){
  var event = event || window.event;
  create({
    x:event.clientX,
    y:event.clientY
  });
}
function auto(){
  timer = setTimeout(function(){
    create({
      x:randomRange(50,document.documentElement.clientWidth - 50),
      y:randomRange(50,document.documentElement.clientHeight - 150)
    })
    auto();
  },randomRange(900,1100))
}

function create(param){
  var oDiv = document.createElement("div");
  var timer = null;
  with(oDiv.style){
    position = "absolute";
    left = param.x + "px";
    top = document.documentElement.clientHeight + "px";
    width = "4px";
    height = "30px";
    borderRadius = "4px";
    background = getRanColor();
  }
  document.body.appendChild(oDiv);
  oDiv.timer = setInterval(function(){
    oDiv.style.top = oDiv.offsetTop - 20 + "px";
    if(oDiv.offsetTop <= param.y) {
      clearInterval(oDiv.timer);
      document.body.removeChild(oDiv);
      (function(){
        var oFrag = document.createDocumentFragment();
        var aChip = [];
        var len = /msie/i.test(navigator.userAgent)?randomRange(20,30):randomRange(50,100);
        for (var i = 0; i < len; i++) {
          var oChip = document.createElement("div");
          with(oChip.style) {
            position = "absolute";
            left = param.x+"px";
            top = param.y+"px";
            width = "4px";
            height = "4px";
            borderRadius = "4px";
            overflow = "hidden";
            background = getRanColor();
          }
          oChip.speedX = randomRange(-20,20);
          oChip.speedY = randomRange(-20,20);
          oFrag.appendChild(oChip);
          aChip[i] = oChip;
        }
        document.body.appendChild(oFrag);
        timer = setInterval(function(){
          for (var i = 0; i < aChip.length; i++) {
            var obj=aChip[i];
            with(obj.style){
              top = obj.offsetTop + obj.speedY + "px";
              left = obj.offsetLeft + obj.speedX + "px";
            }
            obj.speedY++;
            (obj.offsetLeft < 0 || obj.offsetLeft > document.documentElement.clientWidth || obj.offsetTop < 0 || obj.offsetTop > document.documentElement.clientHeight) && (document.body.removeChild(obj),aChip.splice(i,1));
          }
          !aChip[0] && clearInterval(timer);
        },30)
      })()
    }
  },30)
}
// on(window, "load", function(){
//   var oTip = document.getElementById("tips");
//   var aA = oTip.getElementsByTagName("a");
//   on(oTip,"click",function(event){
//     var event = event || window.event;
//     var oTarget = event.target || event.srcElement;
//     if(oTarget.tagName.toUpperCase() == "A"){
//       for (var j = 0; j < aA.length; j++)  aA[j].className = "";
//       oTarget.className = "active";
//       switch(oTarget.id){
//         case "manual":
//           on(document,"click",manual());
//           break;
//         case "auto":
//           auto();
//           break;
//       }
//       event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
//     }
//   })
// })
window.onload = function(){
  var oTip = document.getElementById("tips");
  var aA = oTip.getElementsByTagName("a");
  // on(oTip,"click",function(event){
  //   var event = event || window.event;
  //   var oTarget = event.target || event.srcElement;
  //   if(oTarget.tagName.toUpperCase() == "A"){
  //     for (var j = 0; j < aA.length; j++)  aA[j].className = "";
  //     oTarget.className = "active";
  //     switch(oTarget.id){
  //       case "manual":
  //         on(document,"click",manual());
  //         break;
  //       case "auto":
  //         auto();
  //         break;
  //     }
  //     event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
  //   }
  // })
  for (var i = 0; i < aA.length; i++) {
    aA[i].onclick = function(event){
      var event = event || window.event;
      console.log(event.clientX);
      for (var j = 0; j < aA.length; j++)  aA[j].className = "";
      this.className = "active";
      switch(this.id){
        case "manual":
          on(document,"click",manual());
          break;
        case "auto":
          auto();
          break;
      }
      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }
  }
}
on(document,"contextmenu",function(event){
  var event = event || window.event;
  event.preventDefault ? event.preventDefault(): event.returnValue = false;
})

