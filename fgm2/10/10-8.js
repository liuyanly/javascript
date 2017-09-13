//面向对象
function Zoompic(){
  this.initialize.apply(this,arguments)
}
Zoompic.prototype = {
  initialize: function(obj){
    var _this = this;
    this.box = typeof obj == "string" ? document.getElementById(obj):obj;
    this.oPrev = this.box.getElementsByTagName("pre")[0];
    this.oNext = this.box.getElementsByTagName("pre")[1];
    this.oUl = this.box.getElementsByTagName("ul")[0];
    this.aLi = this.oUl.getElementsByTagName("li");
    this.timer = null;
    this.aSort = [];
    this.iCenter = 3;
    this._doPrev = function(){ return _this.doPrev.apply(_this)};
    this._doNext = function(){ return _this.doNext.apply(_this)};
    this.options = [
      {width:120, height:150, top:71, left:134, zIndex:1},
      {width:130, height:170, top:61, left:0, zIndex:2},
      {width:170, height:218, top:37, left:110, zIndex:3},
      {width:224, height:288, top:0, left:262, zIndex:4},
      {width:170, height:218, top:37, left:468, zIndex:3},
      {width:130, height:170, top:61, left:620, zIndex:2},
      {width:120, height:150, top:71, left:496, zindex:1}
    ];
    for (var i = 0; i < this.aLi.length; i++) {
      this.aSort[i] = this.aLi[i]
    };
    this.aSort.unshift(this.aSort.pop());
    this.setUp();
    this.addEvent(this.oPrev,"click",this._doPrev);
    this.addEvent(this.oNext,"click",this._doNext);
    this.doImgClick();
    this.timer = setInterval(function(){
      _this.doNext();
    },3000);
    this.box.onmouseover = function(){
      clearInterval(_this.timer);
    }
    this.box.onmouseout = function() {
      _this.timer = setInterval(function(){
        _this.doNext();
      },3000);
    }
  },
  doPrev: function(){
    this.aSort.unshift(this.aSort.pop());
    this.setUp();
  },
  doNext: function(){
    this.aSort.push(this.aSort.shift());
    this.setUp();
  },
  doImgClick: function(){
    var _this = this;
    for (var i = 0; i < this.aSort.length; i++) {
      this.aSort[i].onclick = function() {
        if(this.index < _this.iCenter) {
          _this.aSort.unshift(_this.aSort.pop());
          _this.setUp()
        }
        if(this.index > _this.iCenter) {
          _this.aSort.push(_this.aSort.shift());
          _this.setUp()
        }
      }
    };
  },
  setUp: function(){
    var _this = this;
    for (var i = 0; i < this.aSort.length; i++) {
      this.oUl.appendChild(this.aSort[i])
    };
    for (var i = 0; i < this.aSort.length; i++) {
      this.aSort[i].index = i;
      if(i < 7) {
        this.css(this.aSort[i],"display","block");
        this.doMove(this.aSort[i],this.options[i],function(){
            _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0],{opacity:100},function(){
              _this.aSort[_this.iCenter].onmouseover = function(){
                _this.doMove(this.getElementsByTagName("div")[0],{bottom:0})
              }
              _this.aSort[_this.iCenter].onmouseout = function(){
                _this.doMove(this.getElementsByTagName("div")[0],{bottom:-100})
              }
            });
        })
      }else{
        this.css(this.aSort[i],"display","none");
        this.css(this.aSort[i],"width",0);
        this.css(this.aSort[i],"height",0);
        this.css(this.aSort[i],"left",this.oUl.offsetWidth/2);
        this.css(this.aSort[i],"top", this.oUl.offsetHeight/2);
      }
      if(i < this.iCenter || i > this.iCenter) {
        this.css(this.aSort[i].getElementsByTagName("img")[0],"opacity",30);
        this.aSort[i].onmouseover = function() {
            _this.doMove(this.getElementsByTagName("img")[0],{opacity:100})
          }
        this.aSort[i].onmouseout = function() {
          _this.doMove(this.getElementsByTagName("img")[0],{opacity:35})
        }
      }else{
        this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
      }
    };
  },
  addEvent: function(element,type,handler){
    return element.addEventListener ? element.addEventListener(type,handler,false):element.attachEvent("on"+type,handler);
  },
  css: function(element,attr,value){
    if(arguments.length == 2){
       return element.currentStyle?element.currentStyle[attr]:getComputedStyle(element,null)[attr]
    }else if(arguments.length == 3){
      switch(attr){
        case "width":
        case "height":
        case "left":
        case "top":
        case "bottom":
          element.style[attr] = value + "px";
          break;
        case "opacity":
          element.style.filter = "alpha(opacity"+value+")";
          element.style.opacity = value/100;
          break;
        default :
          element.style[attr] = value;
          break
      }
    }
  },
  doMove: function(element,attr,callBack){
    var _this = this;
    clearInterval(element.timer);
    element.timer = setInterval(function(){
      var bStop = true;
      for(var property in attr) {
        var iCur = parseFloat(_this.css(element,property));
        property == "opacity" && (iCur = parseInt(iCur.toFixed(2)*100));
        var iSpeed = (attr[property] - iCur)/5
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iCur != attr[property]) {
          bStop = false
         _this.css(element,property,iCur+iSpeed);
        }
      }
      if(bStop){
          clearInterval(element.timer);
          callBack && callBack.apply(_this,arguments);
        }
    },30)
  }
}
window.onload = function() {
  new Zoompic("box");
}

// //2
// window.onload = function() {
//   var oBox = document.getElementById("box");
//   var oPrev = document.getElementsByTagName("pre")[0];
//   var oNext = document.getElementsByTagName("pre")[1];
//   var oUl = oBox.getElementsByTagName("ul")[0];
//   var aLi = oUl.getElementsByTagName("li");
//   var timer = null;
//   var aSort = [];
//   var iCenter = 3;
//   var options = [
//     {width:120, height:150, top:71, left:134, zIndex:1},
//     {width:130, height:170, top:61, left:0, zIndex:2},
//     {width:170, height:218, top:37, left:110, zIndex:3},
//     {width:224, height:288, top:0, left:262, zIndex:4},
//     {width:170, height:218, top:37, left:468, zIndex:3},
//     {width:130, height:170, top:61, left:620, zIndex:2},
//     {width:120, height:150, top:71, left:496, zindex:1}
//   ]
//   for (var i = 0; i < aLi.length; i++) {
//     aSort[i] = aLi[i]
//   };
//   aSort.unshift(aSort.pop());
//   setUp();
//   doImgClick();
//   oPrev.onclick = function(){
//     aSort.unshift(aSort.pop())
//     setUp();
//   }
//   oNext.onclick = function(){
//     aSort.push(aSort.shift())
//     setUp()
//   }
//   timer = setInterval(function(){
//       aSort.push(aSort.shift())
//       setUp()
//   },3000)
//   oBox.onmouseover = function(){
//     clearInterval(timer)
//   }
//   oBox.onmouseout = function(){
//     timer = setInterval(function(){
//         aSort.push(aSort.shift())
//         setUp()
//     },3000)
//   }
//   function doImgClick(){
//     for (var i = 0; i < aSort.length; i++) {
//       aSort[i].onclick = function(){
//         if(this.index < iCenter) {
//           aSort.unshift(aSort.pop());
//           setUp();
//         }else if(this.index > iCenter){
//           aSort.push(aSort.shift());
//           setUp();
//         }
//       }
//     };
//   }
//   function setUp(){
//       for (var i = 0; i < aSort.length; i++) {
//         oUl.appendChild(aSort[i])
//       };
//       for (var i = 0; i < aSort.length; i++) {
//         aSort[i].index = i;
//         if(i < 7) {
//           css(aSort[i],"display","block");
//           doMove(aSort[i],options[i],function(){
//             doMove(aSort[iCenter].getElementsByTagName("img")[0],{opacity:100},function(){
//                 aSort[iCenter].onmouseover = function() {
//                     doMove(this.getElementsByTagName("div")[0],{bottom:0})
//                 }
//                 aSort[iCenter].onmouseout = function() {
//                   doMove(this.getElementsByTagName("div")[0],{bottom:-100})
//                 }
//             })
//           })
//         }else {
//           css(aSort[i],"display","none");
//           css(aSort[i],"width",0);
//           css(aSort[i],"height",0);
//           css(aSort[i],"left", oUl.offsetWidth/2);
//           css(aSort[i],"top",oUl.offsetHeight/2);
//         }
//         if(i < iCenter || i > iCenter) {
//           css(aSort[i].getElementsByTagName("img")[0],"opacity", 30);
//           aSort[i].onmouseover = function(){
//             css(this.getElementsByTagName("img")[0], "opacity", 100)
//           }
//           aSort[i].onmouseout = function() {
//             css(this.getElementsByTagName("img")[0], "opacity", 35)
//           }
//         }else{
//           aSort[i].onmouseover = aSort[i].onmouseout = null
//         }
//     };
//   }

//   function doMove(element, attr, callBack){
//     clearInterval(element.timer);
//     element.timer = setInterval(function(){
//       var bStop = true;
//       for(var property in attr){
//         var iCur = parseFloat(css(element, property));
//         property == "opacity" && (iCur = parseInt(iCur.toFixed(2)*100))

//         var iSpeed = (attr[property] - iCur)/5;
//         iSpeed = iSpeed > 0 ?Math.ceil(iSpeed):Math.floor(iSpeed);

//         if(iCur != attr[property]){
//           bStop = false
//           css(element, property, iCur+iSpeed)
//         }
//       }
//       if(bStop) {
//         clearInterval(element.timer);
//         callBack && callBack.apply(this, arguments);
//       }
//     },30)
//   }
// }
// function css(element,attr,value) {
//   if(arguments.length == 2) {
//     return element.currentStyle ? element.currentStyle[attr]:getComputedStyle(element,null)[attr]
//   }else if (arguments.length == 3) {
//     switch(attr){
//       case "width":
//       case "height":
//       case "left":
//       case "top":
//       case "bottom":
//         element.style[attr] = value + "px";
//         break;
//       case "opacity":
//         element.style.filter = "alpha(opacity"+value+")";
//         element.style.opacity = value / 100;
//         break;
//       default:
//         element.style[attr] = value;
//         break;
//     }
//   }
// }

// //1
// window.onload = function() {
//   var oBox = document.getElementById("box");
//   var oPrev = oBox.getElementsByTagName("pre")[0];
//   var oNext = oBox.getElementsByTagName("pre")[1];
//   var oUl = oBox.getElementsByTagName("ul")[0];
//   var aLi = oUl.getElementsByTagName("li");
//   var timer = null;
//   var aSort = [];
//   var iCenter = 3;
//   var options = [
//     {width:120, height:150, top:71, left:134, zIndex:1},
//     {width:130, height:170, top:61, left:0, zIndex:2},
//     {width:170, height:218, top:37, left:110, zIndex:3},
//     {width:224, height:288, top:0, left:262, zIndex:4},
//     {width:170, height:218, top:37, left:468, zIndex:3},
//     {width:130, height:170, top:61, left:620, zIndex:2},
//     {width:120, height:150, top:71, left:496, zindex:1}
//   ];
//   for (var i = 0; i < aLi.length; i++) {
//     aSort[i] = aLi[i]
//   };
//   aSort.unshift(aSort.pop());
//   setUp();
//   doImgClick();
//   oPrev.onclick = function() {
//     aSort.unshift(aSort.pop());
//     setUp();
//   }
//   oNext.onclick = function() {
//     aSort.push(aSort.shift());
//     setUp();
//   }
//   timer = setInterval(function(){
//     aSort.push(aSort.shift());
//     setUp();
//   },3000)
//   oBox.onmouseover = function() {
//     clearInterval(timer);
//   }
//   oBox.onmouseout = function() {
//     timer = setInterval(function(){
//       aSort.push(aSort.shift());
//       setUp();
//     },3000)
//   }
//   function doImgClick() {
//     for (var i = 0; i < aSort.length; i++) {
//       aSort[i].onclick = function() {
//         if(this.index > iCenter) {
//           // for (var i = 0; i < this.index - iCenter; i++) {
//             aSort.push(aSort.shift());
//           // };
//           setUp();
//         }
//         else if(this.index < iCenter) {
//           aSort.unshift(aSort.pop());
//           setUp();
//         }
//       }
//     };
//   }
//   function setUp(){
//     var i = 0;
//     for (i = 0; i < aSort.length; i++) {
//       oUl.appendChild(aSort[i])
//     };
//     for (i = 0; i < aSort.length; i++) {
//       aSort[i].index = i;
//       if(i < 7) {
//         css(aSort[i],"display","block");
//         doMove(aSort[i], options[i],function(){
//           doMove(aSort[iCenter].getElementsByTagName("img")[0], {opacity:100}, function(){
//             // doMove(aSort[iCenter].getElementsByTagName("img")[0], {opacity:100}, function(){
//               aSort[iCenter].onmouseover = function() {
//                 doMove(this.getElementsByTagName("div")[0],{bottom:0})
//               };
//               aSort[iCenter].onmouseout = function() {
//                 doMove(this.getElementsByTagName("div")[0],{bottom:-100})
//               }
//             // })
//           })
//         })
//       }
//       else{
//         css(aSort[i],"display","none");
//         css(aSort[i],"width",0);
//         css(aSort[i],"height",0);
//         css(aSort[i],"top",37);
//         css(aSort[i],"left",oUl.offsetWidth/2)
//       }
//       if(i < iCenter || i > iCenter) {
//         css(aSort[i].getElementsByTagName("img")[0],"opacity",30);
//         aSort[i].onmouseover = function() {
//           doMove(this.getElementsByTagName("img")[0], {opacity:100})
//         };
//         aSort[i].onmouseout = function() {
//           doMove(this.getElementsByTagName("img")[0],{opacity:35})
//         }
//       }
//       else {
//         aSort[i].onmouseover = aSort[i].onmouseout = null
//       }
//     };
//   }
//   function doMove(oElement,oAttr,fnCallBack){
//     clearInterval(oElement.timer);
//     oElement.timer = setInterval(function(){
//       var bStop = true;
//       for(var property in oAttr){

//         var iCur = parseFloat(css(oElement,property));
//         property == "opacity" && (iCur = parseInt(iCur.toFixed(2)*100));
//         var iSpeed = (oAttr[property]-iCur) / 5;
//         iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

//         if(iCur != oAttr[property]){
//           bStop = false;
//           css(oElement,property,iCur+iSpeed)
//         }
//       }
//       if(bStop){
//         clearInterval(oElement.timer);
//         fnCallBack && fnCallBack.apply(this,arguments);
//       }
//     },30)
//   }
// }
// function addEvent(element,type,handler){
//   return element.addEventListener?element.addEventListener(type,handler,false):
//   element.attachEvent("on"+type,handler)
// }
// function css(element,attr,value){
//   if(arguments.length == 2) {
//     return element.currentStyle?element.currentStyle[attr]:getComputedStyle(element,null)[attr]
//   }
//   else if(arguments.length == 3){
//     switch(attr){
//       case "width":
//       case "height":
//       case "top":
//       case "left":
//       case "bottom":
//         element.style[attr] = value + "px";
//         break;
//       case "opacity":
//         element.style.filter = "alpha(opacity"+value+")";
//         element.style.opacity = value / 100;
//         break;
//       default:
//         element.style[attr] = value;
//         break;
//     }
//   }
// }