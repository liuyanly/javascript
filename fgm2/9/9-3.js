window.onload = function(){
  var aForm = document.getElementsByTagName("form");
  for (var i = 0; i < aForm.length; i++) {
    WellForm(aForm[i]);
  };
}
//获取class
function getClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )" + sClass + "( |$)");
  var aElem = (oParent || document).getElementsByTagName("*");
  for (var i = 0; i < aElem.length; i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i])
  };
  return aClass;
}
//class是否存在
function hasClass(obj, sClass) {
  var reg = new RegExp("(^|\\s)"+sClass+"(\\s|$)");
  return reg.test(obj.className)
}
//添加class
function addClass(obj,sClass) {
  hasClass(obj,sClass) || (obj.className += " " + sClass)
}
//删除class
function removeClass(obj,sClass) {
  if(hasClass(obj,sClass)){
    var reg = new RegExp("(^|\\s)" + sClass + "(\\s|$)");
    obj.className = obj.className.replace(reg,"")
  }
}
//上一个元素
function prevElement(obj){
  return obj.previousSibling || obj.previousElementSibling || null
}
//下一个元素
function nextElement(obj){
  return obj.nextSibling || obj.nextElementSibling || null
}
//自定义表单函数
function WellForm(form) {
  var zIndex = 1;
  var aInput = form.getElementsByTagName("input");
  var aSelect = form.getElementsByTagName("select");
  var aTextArea = form.getElementsByTagName("textarea");
  form.className = "WellForm";

  //单行文本域
  var aText = [];
  for (var i = 0; i < aInput.length; i++) {
    (aInput[i]["type"] == "text" || aInput[i]["type"] == "password") && aText.push(aInput[i]);
  };

  for (var i = 0; i < aText.length; i++) {
    var oTextL = document.createElement("div");
    var oTextR = document.createElement("div");
    oTextL.className = "TextL";
    oTextR.className = "TextR";
    aText[i].className = "WellText";
    aText[i].parentNode.insertBefore(oTextL, aText[i]);
    aText[i].parentNode.insertBefore(oTextR, nextElement(aText[i]));
    //获取焦点
    aText[i].onfocus = function() {
      addClass(this,"WellTextH");
      addClass(prevElement(this), "TextLH");
      addClass(nextElement(this), "TextRH");
    }
    //失去焦点
    aText[i].onblur = function() {
      removeClass(this, "WellTextH");
      removeClass(prevElement(this), "TextLH");
      removeClass(nextElement(this), "TextRH");
    }
  };
  //多行文本域
  for (var i = 0; i < aTextArea.length; i++) {
    var oTextArea = document.createElement("div");
    oTextArea.className = "WellTextArea";
    //上边框
    var T = document.createElement("div");
    var TL = document.createElement("div");
    var TM = document.createElement("div");
    T.className = "T";
    TL.className = "TL";
    TM.className = "TM";
    TL.appendChild(TM);
    T.appendChild(TL);
    //中间边框
    var M = document.createElement("div");
    var MR = document.createElement("div");
    M.className = "M";
    MR.className = "MR";
    M.appendChild(MR);
    //下边框
    var B = document.createElement("div");
    var BL = document.createElement("div");
    var BM = document.createElement("div");
    B.className = "B";
    BL.className = "BL";
    BM.className = "BM";
    BL.appendChild(BM);
    B.appendChild(BL);
    //插入结构
    aTextArea[i].parentNode.insertBefore(oTextArea,aTextArea[i]);
    MR.appendChild(aTextArea[i]);
    oTextArea.appendChild(T);
    oTextArea.appendChild(M);
    oTextArea.appendChild(B);
    oTextArea.style.width = MR.offsetWidth + "px";
    aTextArea[i].onfocus = function(){
      var M = this.parentNode.parentNode;
      addClass(M,"MH");
      addClass(prevElement(M),"TH");
      addClass(nextElement(M),"BH");
    }
    aTextArea[i].onblur = function(){
      var M = this.parentNode.parentNode;
      removeClass(M,"MH");
      removeClass(prevElement(M),"TH");
      removeClass(nextElement(M),"BH")
    }
  };
  //单选
  var aRadio = [];
  for (var i = 0; i < aInput.length; i++) {
    aInput[i]["type"] == "radio" && aRadio.push(aInput[i]);
  };
  for (var i = 0; i < aRadio.length; i++) {
    var oRadio = document.createElement("div");
    oRadio.className = "WellRadio";
    aRadio[i].parentNode.insertBefore(oRadio,aRadio[i]);
    oRadio.appendChild(aRadio[i]);

    aRadio[i].checked && addClass(aRadio[i].parentNode,"WellRadioH");

    oRadio.onclick = function() {
      var siblings = getClass("WellRadio",this.parentNode);
      for (var i = 0; i < siblings.length; i++) {
        removeClass(siblings[i],"WellRadioH");
        siblings[i].children[0].checked = false;
      };
      addClass(this,"WellRadioH");
      this.children[0].checked = true;
    }
  };
  //复选框
  var aCheckBox = [];
  for (var i = 0; i < aInput.length; i++) {
    aInput[i]["type"]=="checkbox" && aCheckBox.push(aInput[i]);
  };
  for (var i = 0; i < aCheckBox.length; i++) {
    var oCheckBox = document.createElement("div");
    oCheckBox.className = "WellCheckBox";

    aCheckBox[i].parentNode.insertBefore(oCheckBox,aCheckBox[i]);
    oCheckBox.appendChild(aCheckBox[i]);

    aCheckBox[i].checked && addClass(aCheckBox[i].parentNode,"WellCheckBoxH");

    oCheckBox.onclick = function() {
      this.children[0].checked = !this.children[0].checked;
      this.children[0].checked ? addClass(this,"WellCheckBoxH"):removeClass(this,"WellCheckBoxH")
    }
  };
  //按钮
  var aBtn = [];
  for (var i = 0; i < aInput.length; i++) {
    aInput[i]["type"] == "submit" && aBtn.push(aInput[i])
  };
  for (var i = 0; i < aBtn.length; i++) {
    var aBtnL = document.createElement("div");
    var aBtnR = document.createElement("div");
    aBtnL.className = "ButtonL";
    aBtnR.className = "ButtonR";
    aBtn[i].className = "WellButton";
    aBtn[i].parentNode.insertBefore(aBtnL,aBtn[i]);
    aBtn[i].parentNode.insertBefore(aBtnR,nextElement(aBtn[i]));

    aBtn[i].onmouseover = function() {
      addClass(this,"WellButtonH");
      addClass(prevElement(this),"ButtonLH");
      addClass(nextElement(this),"ButtonRH");
    }
    aBtn[i].onmouseout = function() {
      removeClass(this,"WellButtonH");
      removeClass(prevElement(this),"ButtonLH");
      removeClass(nextElement(this),"ButtonRH");
    }
  };
  //下拉菜单
  for (var i = 0; i < aSelect.length; i++) {
    var oFragment = document.createDocumentFragment();
    var oSelectL = document.createElement("div");
    var oSelectR = document.createElement("div");
    var oSelect = document.createElement("div");
    var oEm = document.createElement("em");
    var oUl = document.createElement("ul");
    oSelectL.className = "SelectL";
    oSelectR.className = "SelectR";
    oSelect.className = "WellSelect";
    //插入结构
    aSelect[i].parentNode.insertBefore(oSelectL,aSelect[i]);
    aSelect[i].parentNode.insertBefore(oSelectR,nextElement(aSelect[i]));
    oUl.style.width = oSelect.style.width = aSelect[i].offsetWidth - oSelectR.offsetWidth/2 + "px";

    for (var j = 0; j < aSelect[i].options.length; j++) {
      var oLi = document.createElement("li");
      oLi.innerHTML = aSelect[i].options[j].text;
      oFragment.appendChild(oLi);
      aSelect[i].options[j].selected && (oEm.innerHTML = aSelect[i].options[j].text)
    };
    oUl.appendChild(oFragment);
    oSelect.appendChild(oEm);
    oSelect.appendChild(oUl);
    aSelect[i].parentNode.insertBefore(oSelect,aSelect[i]);
    oSelect.appendChild(aSelect[i]);

    oSelect.onclick = oSelectR.onclick = function(event){
      var o = this.getElementsByTagName("ul")[0] || prevElement(this).getElementsByTagName("ul")[0];
      var aUl = form.getElementsByTagName("ul");
      this.parentNode.style.position = "relative";
      this.parentNode.style.zIndex = zIndex++;
      o.style.display = o.style.display == "block"?"none":"block";
      for(var i= 0 ; i < aUl.length; i++) {
        if(o == aUl[i]) continue;
        aUl[i].style.display = "none"
      }
      var aLi = o.getElementsByTagName("li");
      for (var i = 0; i < aLi.length; i++) {
        aLi[i].onmouseover = function(){
          this.className = "hover"
        }
        aLi[i].onmouseout = function(){
          this.className = ""
        }
        aLi[i].onclick = function(){
          prevElement(this.parentNode).innerHTML = this.innerHTML;
        }
      };
      (event || window.event).cancelBubble = true;

      document.onclick = function(){
        o.style.display = "none";
      }
    }
  };
}
