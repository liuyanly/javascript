function byId(id) {
  return typeof id === "string" ? document.getElementById(id):id
}
function byClass(sClass, oParent) {
  var aClass = [];
  var reClass = new RegExp("(^| )"+sClass+"( |$)");
  var aElem = byTagName("*", oParent);
  for(var i = 0; i < aElem.length;i++) {
    reClass.test(aElem[i].className) && aClass.push(aElem[i]);
  }
  return aClass;
}
function byTagName(elem,obj) {
  return (obj || document).getElementsByTagName(elem);
}

function cssSelect(obj){
  var oSelect = byClass("select-a",obj)[0];
  var oDropDown = byClass("dropdown-menu",obj)[0];
  var oUl = byTagName("ul",oDropDown)[0];
  var aOption = byTagName("li",obj);
  var oBtn = byTagName("input",oDropDown)[0];
  var aArr = [
    {
      key: "风速",
      attr : {
        flag: 0
      }
    },
    {
      key: "舱外",
      attr : {
        flag: 0
      }
    },
    {
      key: "变浆角3",
      attr : {
        flag: 0
      }
    },
    {
      key: "功率因素",
      attr : {
        flag: 0
      }
    },
    {
      key: "偏航角度",
      attr : {
        flag: 0
      }
    },
    {
      key: "低轴转速速",
      attr : {
        flag: 0
      }
    },
    {
      key: "A相相电流",
      attr : {
        flag: 0
      }
    }
  ];
  create();
  function create(){
    var oFrag = document.createDocumentFragment();
    for (var i = 0; i < aArr.length; i++) {
      var oLi = document.createElement("li");
      var oLabel = document.createElement("label");
      var oCheckbox = document.createElement("span");
      var oOption = document.createElement("span");
      oOption.className = "css-option";
      oOption.innerHTML = aArr[i].key;
      oOption.setAttribute("flag",aArr[i].attr.flag);
      oCheckbox.className = "cs_checkbox_s";
      oLabel.appendChild(oCheckbox);
      oLabel.appendChild(oOption);
      oLi.className = "checkbox";
      oLi.appendChild(oLabel);
      oFrag.appendChild(oLi);
    };
    oUl.appendChild(oFrag);
  }
  oSelect.onclick = function(){
    oDropDown.style.display = oDropDown.style.display == "block"?"none": "block";
  }
  for (var i = 0; i < aOption.length; i++) {
    aOption[i].onclick = function(){
      var iOption = byClass("css-option",this)[0];
      this.className == "checkbox"
      ? (this.className += " checked",iOption.setAttribute("flag",1))
      : (this.className = this.className.replace(/\schecked/,""),iOption.setAttribute("flag",0));
    }
  };
  var iOpts = byClass("css-option", oDropDown);
  oBtn.onclick = function() {
      var aOptions = [];
      for (var i = 0; i < iOpts.length; i++) {
        if(iOpts[i].getAttribute("flag") == 1){
            aOptions.push(iOpts[i].innerHTML)
            oSelect.innerHTML =  aOptions.join("/");
            oDropDown.style.display = "none";
        };
      }
      console.log(aOptions);
  }
}
window.onload = function(){
  var aSelectMenu = byClass("selectmenu");
  for( var i = 0 ; i<aSelectMenu.length;i++){
    cssSelect(aSelectMenu[i]);
  }
}