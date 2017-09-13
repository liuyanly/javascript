function byId(id) {
  return typeof id === "string" ? document.getElementById(id):id
}
function byClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^|\s)"+sClass+"(\s|$)")
  var aElem = byTagName("*",oParent);
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass;
}
function byTagName(elem, obj) {
  return (obj || window).getElementsByTagName(elem)
}
var EventUtil = {
  addHandler: function(oElement, sEvent, fnHandler) {
    oElement.addEventListener? oElement.addEventListener(sEvent,fnHandler,false):
    oElement.attachEvent("on"+sEvent,fnHandler)
  },
  removeHandler: function(oElement, sEvent, fnHandler) {
    oElement.removeEventListener? oElement.removeEventListener(sEvent,fnHandler,false):
    oElement.detachEvent("on"+sEvent,fnHandler)
  },
  addLoadHander: function(fnHandler) {
    this.addHandler(window,"load",fnHandler)
  }
}
function css(obj,attr,value) {
  switch(arguments.length){
    case 2:
      if(typeof arguments[1] == "object"){
        for(var i in attr) i == "opacity" ? (obj.style[i] = attr[i] / 100,obj.style["filter"] ="alpha(opacity="+attr[i]+")"): obj.style[i] = attr[i];
      }else{
        return obj.currentStyle ? obj.currentStyle[attr]:
               getComputedStyle(obj,null)[attr]
      }
      break;
    case 3:
      attr == "opacity" ? (obj.style["filter"] = "alpha(opacity="+value+")", obj.style[attr]=value/100):obj.style[attr] = value
      break;
  }
}
EventUtil.addLoadHander(function(){
  var oMsgBox = byId("msgBox");
  var oForm = byTagName("form",oMsgBox)[0];
  var oFtxt = byClass("f-text",oMsgBox);
  var oUserName = byId("userName");
  var oConBox = byId("conBox");
  var aImg = byTagName("img",byId("face"));
  var oCountTxt = byClass("countTxt",oMsgBox)[0];
  var oMaxNum = byClass("maxNum",oMsgBox)[0];
  var oSendBtn = byId("sendBtn");
  var oUl = byTagName("ul",oMsgBox)[0];
  var aLi = byTagName("li",oUl);
  var bSend = false;
  var timer = null;
  var maxNum = 140;
  //禁止表单提交
  EventUtil.addHandler(oForm,"submit",function(){return false});
  //为广播按钮绑定发送事件
  EventUtil.addHandler(oSendBtn,"click",fnSend);
  //为Ctrl+Enter快捷键绑定发送事件
  EventUtil.addHandler(document,"keyup",function(event){
    var event = event || window.event;
    event.ctrlKey && event.keyCode == 13 && fnSend()
  })
  //发送广播
  function fnSend() {
    var reg = /^\s*$/g;
    if(reg.test(oUserName.value)) {
      alert("请填写您的姓名");
      oUserName.focus();
    }
    else if(!/^[u4e00-\u9fa5\w]{2,8}$/g.test(oUserName.value)) {
      alert("姓名由2-8位字母、数字、下划线、汉字组成！");
      oUserName.focus()
    }
    else if(reg.test(oConBox.value)){
      alert("随便说点什么吧");
      oConBox.focus()
    }
    else if(!bSend){
      alert("你输入的内容已超出限制，请检查！");
      oConBox.focus()
    }
    else{
      var oLi = document.createElement("li");
      var oDate = new Date();
      oLi.innerHTML = "<div class=\"userPic\"><img src=\""+byClass("current",byId("face"))[0].src+"\"></div>\
                       <div class=\"content\">\
                            <div class=\"userName\"><a href=\"javascript:;\">"+oUserName.value+"</a>:</div>\
                            <div class=\"msgInfo\">"+oConBox.value.replace(/<[^>]*>|&nbsp;/ig,"")+"</div>\
                            <div class=\"times\"><span>"+format(oDate.getMonth()+1)+"月"+format(oDate.getDate())+"日 "+ format(oDate.getHours())+":"+format(oDate.getMinutes())+"</span><a class=\"del\" href=\"javascript:;\">删除</a></div>\
                       </div>";
      aLi.length ? oUl.insertBefore(oLi,aLi[0]) : oUl.appendChild(oLi);

      //重置表单
      oForm.reset();
      for (var i = 0; i < aImg.length; i++) {
        aImg[i].className = ""
      };
      aImg[0].className = "current";

      //将元素高度保存
      var iHeight = oLi.clientHeight - parseFloat(css(oLi,"paddingTop")) - parseFloat(css(oLi,"paddingBottom"));
      var alpha = count = 0;
      css(oLi, {"opacity":"0","height":"0"});
      timer = setInterval(function(){
        css(oLi,{"display":"block","opacity":"0","height":(count += 8)+"px"});
        if(count > iHeight){
          clearInterval(timer);
          css(oLi,"height",iHeight+"px");
          timer = setInterval(function(){
            css(oLi,"opacity",(alpha += 10));
            alpha > 100 && (clearInterval(timer), css(oLi, "opacity",100))
          },30)
        }
      },30)
      liHover()
      delLi()
    }
  }
  //事件绑定，判断字符输入
  EventUtil.addHandler(oConBox,"keyup",confine);
  EventUtil.addHandler(oConBox,"focus",confine);
  EventUtil.addHandler(oConBox,"change",confine);
  //输入字符限制
  function confine() {
    var iLen = 0;
    for (var i = 0; i < oConBox.value.length; i++) {
      iLen += /[^\x00-\xff]/.test(oConBox.value.charAt(i))? 1 : 0.5;
      oMaxNum.innerHTML = Math.abs(maxNum - Math.floor(iLen));
      maxNum - Math.floor(iLen) >= 0 ? (css(oMaxNum,"color",""),oCountTxt.innerHTML = "还能输入",bSend = true) :
      (css(oMaxNum,"color","f60"),oCountTxt.innerHTML = "已超出",bSend = false)
    };
  }
  confine()
  //广播鼠标划过/离开
  EventUtil.addHandler(oSendBtn,"mouseover",function(){
    this.className = "hover"
  })
  EventUtil.addHandler(oSendBtn,"mouseout",function(){
    this.className = ""
  })
  //li鼠标划过离开处理函数
  function liHover() {
    for (var i = 0; i < aLi.length; i++) {
      EventUtil.addHandler(aLi[i],"mouseover",function(){
         this.className = "hover";
         var oTime = byClass("times",this)[0];
         var aA = byTagName("a",oTime);
         if(!aA.length) {
          var oA = document.createElement("a");
          oA.innerHTML = "删除";
          oA.className = "del";
          oA.href = "javascript:;"
          oTime.appendChild(oA);
         }else{
          aA[0].style.display = "block";
         }
      });
      EventUtil.addHandler(aLi[i],"mouseout",function(){
        this.className = "";
        var oA = byTagName("a",byClass("times",this)[0])[0];
        oA.style.display = "none"
      })
    };
  }
  liHover();
  //删除功能
  function delLi(){
    var aA = byClass("del",oUl);
    for (var i = 0; i < aA.length; i++) {
      aA[i].onclick=function(){
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
              css(oParent,"height",iHeight+"px");
              iHeight == 0 && (clearInterval(timer),oUl.removeChild(oParent))
            },30)
          }
        },30)
        this.onclick = null
      }
    };
  }
  delLi();
  //输入框获取焦点时的样式
  for (var i = 0; i < oFtxt.length; i++) {
    EventUtil.addHandler(oFtxt[i],"focus",function(){
      this.className += " active";
    })
    EventUtil.addHandler(oFtxt[i],"blur",function(){
      this.className = this.className.replace(/\s?active/,"")
    })
  };
  //格式化时间，如果为一位数时补0
  function format(str) {
    return str.toString().replace(/^(\d)$/,"0$1")
  }
  //头像
  for (var i = 0; i < aImg.length; i++) {
    EventUtil.addHandler(aImg[i],"mouseover",function(){

      this.className += " hover"
    });
    EventUtil.addHandler(aImg[i],"mouseout",function(){
      this.className = this.className.replace(/\s?hover/,"");
    });
    EventUtil.addHandler(aImg[i],"click",function(){
      for (var i = 0; i < aImg.length; i++) {
        aImg[i].className = ""
      };
      this.className = "current"
    })
  };
})