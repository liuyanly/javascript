//获取id,class,tagName
function getId(id) {
  return typeof id === "string" ? document.getElementById(id): id;
}
function getClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = getTagName("*", oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass;
}
function getTagName(elem, obj) {
  return (obj || document).getElementsByTagName(elem);
}
// 事件绑定，删除
var EventUtil = {
  addHandler : function(oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) :
    (oElement["_"+ sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function() {
      oElement["_"+sEvent + fnHandler]()}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
  },
  removeHandler : function(oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent,fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
  },
  addLoadHandler : function(fnHandler) {
    this.addHandler(window,"load", fnHandler)
  }
}
//设置css样式,读取css样式
function css(obj,attr,value) {
  switch(arguments.length) {
    case 2:
      if(typeof arguments[1] == "object") {
        for ( var i in attr) i == "opacticy" ? (obj.style["filter"] = "alpha(opacticy="+attr[i]+")", obj.style[i] = attr[i]/100) : obj.style[i] = attr[i];
      }else{
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
      }
      break;
    case 3:
      attr == "opacity" ? (obj.style["filter"] = "alpha(opacity="+ value +")", obj.style[attr] = value/100 ) : obj.style[attr] = value;
      break;
  }
}

EventUtil.addLoadHandler(function() {
  var oMsgBox = getId("oMsgBox");
  var oUserName = getId("userName");
  var oConBox = getId("conBox");
  var oSendBtn = getId("sendBtn");
  var oMaxNum = getClass("maxNum")[0];
  var oCountTxt = getClass("countTxt")[0];
  var oList = getClass("list")[0];
  var oUl = getTagName("ul",oList)[0];
  var aLi = getTagName("li", oList);
  var aFtxt = getClass("f-text",oMsgBox);
  var aImg = getTagName("img", getId("face"));
  var bSend = false;
  var oTmp = "";
  var maxNum = 140;

  //禁止表单提交
  EventUtil.addHandler(getTagName("form", oMsgBox)[0], "submit", function(){ return false});
  //为广播按钮绑定发送事件
  EventUtil.addHandler(oSendBtn, "click" ,fnsend);
  // 为Ctrl+Enter快捷键绑定发送事件
  EventUtil.addHandler(document, "keyup", function(event){
    var event = event || window.event;
    event.ctrlKey && event.keyCode == 13 && fnsend()
  });
  //发送广播函数
  function fnsend() {
    var reg = /^\s*$/g;
    if(reg.test(oUserName.value)){
      alert("请填写您的姓名");
      oUserName.focus();
    }else if(!/^[u4e00-\u9fa5\w]{2,8}$/g.test(oUserName.value)) {
      alert("姓名由2-8位字母、数字、下划线、汉字组成！");
      oUserName.focus()
    }else if(reg.test(oConBox.value)){
      alert("随便说点什么吧！");
      oConBox.focus()
    }else if(!bSend){
      alert("你输入的内容已超出限制，请检查！");
      oConBox.focus()
    }else{
      var oLi = document.createElement("li");
      var oDate = new Date();
      oLi.innerHTML = "<div class=\"userPic\"><img src=\"" + getClass("current", getId("face"))[0].src + "\"> </div>\
                       <div class=\"content\">\
                          <div class=\"userName\"><a href=\"javascript:;\">"+oUserName.value+"</a>:</div>\
                          <div class=\"msgInfo\">"+oConBox.value.replace(/<[^>]*>|&nbsp;/ig,"")+"</div>\
                          <div class=\"times\"><span>"+format(oDate.getMonth()+1)+"月"+format(oDate.getDate())+"日"+format(oDate.getHours())+":"+format(oDate.getMinutes())+"</span><a class=\"del\" href=\"javascript:;\">删除</a></div>\
                       </div>";
    }
    //插入元素
    aLi.length ? oUl.insertBefore(oLi,aLi[0]) : oUl.appendChild(oLi);

    //重置表单
    getTagName("form", oMsgBox)[0].reset();
    for (var i = 0; i < aImg.length; i++) {
      aImg[i].className = "";
    };
    aImg[0].className = "curent";

    //将元素保存
    var iHeight = oLi.clientHeight - parseFloat(css(oLi,"paddingTop")) - parseFloat(css(oLi,"paddingBottom"));
    var alpha = count = 0;
    css(oLi, {"opacity": "0", "height" : "0"});
    timer = setInterval(function(){
      css(oLi, {"display": "block", "opacity": "0", "height": (count += 8) + "px"});
      if(count > iHeight){
        clearInterval(timer);
        css(oLi,"height",iHeight+"px");
        timer = setInterval(function(){
          css(oLi,"opacity", (alpha += 10));
          alpha > 100 && (clearInterval(timer), css(oLi, "opacity", 100))
        },30)
      }
    },30)
    //调用鼠标划过/离开样式
    liHover();
    //调用删除函数
    delLi()
  }
  //事件绑定，判断字符输入
  EventUtil.addHandler(oConBox, "keyup", confine);
  EventUtil.addHandler(oConBox, "focus", confine);
  EventUtil.addHandler(oConBox, "change", confine);
  //输入字符限制
  function confine() {
    var iLen = 0;
    for (var i = 0; i < oConBox.value.length; i++) {
     iLen += /[^\x00-\xff]/g.test(oConBox.value.charAt(i))?1:0.5;
    };
    oMaxNum.innerHTML = Math.abs(maxNum - Math.floor(iLen));
    maxNum - Math.floor(iLen) >= 0 ? (css(oMaxNum,"color", ""), oCountTxt.innerHTML = "还能输入", bSend = true) :
    (css(oMaxNum,"color","#f60"),oCountTxt.innerHTML = "已超出", bSend = false)
  }
  //加载即调用
  confine();

  // 广播按钮鼠标划过样式
  EventUtil.addHandler(oSendBtn, "mouseover", function() {this.className = "hover"});
  // 广播按钮鼠标离开样式
  EventUtil.addHandler(oSendBtn, "mouseout", function() {this.className = ""})
  // li鼠标划过/离开处理函数
  function  liHover(){

    for (var i = 0; i < aLi.length; i++) {
      //鼠标划过样式
      EventUtil.addHandler(aLi[i],"mouseover",function(event){
        this.className = "hover";
        oTmp = getClass("times",this)[0];
        var aA = getTagName("a", oTmp);
        if(!aA.length){
          var oA = document.createElement("a");
          oA.innerHTMl = "删除";
          oA.className = "del";
          oA.href = "javascript:;";
          oTmp.appendChild(oA)
        }else{
          aA[0].style.display = "block";
        }
      });

      //鼠标离开样式
      EventUtil.addHandler(aLi[i],"mouseout",function(){
        this.className = "";
        var oA = getTagName("a",getClass("times",this)[0])[0];
        oA.style.display = "none"
      })
    };
  }
  liHover();

  //删除功能
  function delLi() {
    var aA = getClass("del",oUl);
    for (var i = 0; i < aA.length; i++) {
      aA[i].onclick = function() {
        var oParent = this.parentNode.parentNode.parentNode;
        var alpha = 100;
        var iHeight = oParent.offsetHeight;
        timer = setInterval(function(){
          css(oParent,"opacity",(alpha -= 10));
          if(alpha < 0) {
            clearInterval(timer);
            timer = setInterval(function(){
              iHeight -= 10;
              iHeight < 0 && (iHeight = 0);
              css(oParent, "iHeight", iHeight+"px");
              iHeight == 0 && (clearInterval(timer),oUl.removeChild(oParent))
            },30)
          }
        },30)
        this.onclick = null
      }
    };
  }
  delLi();
  //输入框获取焦点时样式
  for (var i = 0; i < aFtxt.length; i++) {
    EventUtil.addHandler(aFtxt[i],"focus", function() { this.className = "active"});
    EventUtil.addHandler(aFtxt[i],"blur", function() {this.clearName = ""})
  };
  // 格式化时间,如果为一位数时补0
  function format(str){
    return str.toString().replace(/^(\d)$/,"0$1")
  }
  //头像
  for (var i = 0; i < aImg.length; i++) {
    aImg[i].onmouseover = function() {
      this.className += " hover"
    }
    aImg[i].onmouseout = function() {
      this.className = this.className.replace(/\s?hover/,"")
    }
    aImg[i].onclick = function () {
      for (var i = 0; i < aImg.length; i++) {
        aImg[i].className = "";
      }
      this.className = "current";
    }
  };
})