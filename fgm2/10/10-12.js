var fgm = {
  $: function(id){
    return typeof id === "string" ? document.getElementById(id) : id
  },
  $$: function(elem, obj) {
    return (obj || document).getElementsByTagName(elem)
  },
  $$$: function(sClass, oParent) {
    var aClass = [];
    var reClass = new RegExp("(^|//s)" + sClass + "(//s|$)");
    var aElem = this.$$("*", oParent);
    for (var i = 0; i < aElem.length; i++) {
      reClass.test(aElem[i].className) && aClass.push(aElem[i])
    };
    return aClass
  },
  index: function(element) {
    var aChildren = element.parentNode.children, i;
    for (i = 0; i < aChildren.length; i++) {
      if(aChildren[i] === element) return i;
    };
    return -1;
  },
  on: function(element, type, handler){
    return element.addEventListener ? element.addEventListener(type, handler,!1):
    element.attachEvent("on"+type,handler)
  },
  bind: function(object, handler){
    return function() {
      return handler.apply(object, arguments)
    }
  }
}
function Tab(id) {
  this.obj = fgm.$(id);
  this.oTab = fgm.$$$("tab", this.obj)[0];
  this.aTab = fgm.$$("li",this.oTab);
  this.oSwitch = fgm.$$$("switchBtn", this.oTab)[0];
  this.oPrev = fgm.$$("a", this.oSwitch)[0];
  this.oNext = fgm.$$("a", this.oSwitch)[1];
  this.aItems = fgm.$$$("items",this.obj);
  this.iNow = 0;
  fgm.on(this.oSwitch, "click", fgm.bind(this, this.fnClick));
  fgm.on(this.oTab, "mouseover", fgm.bind(this, this.fnMouseOver))
}
Tab.prototype = {
  fnMouseOver: function(ev) {
    var oEv = ev || event,
    oTarget = oEv.target || oEv.srcElement;
    oTarget.tagName.toUpperCase() === "LI" && (this.iNow = fgm.index(oTarget));
    this.fnSwitch();
  },
  fnClick: function(ev){
    var oEv = ev || event,
    oTarget = oEv.target || oEv.srcElement,
    i;
    switch(fgm.index(oTarget)) {
      case 0:
        if(oTarget.className == "prev"){
          this.aTab[this.iNow].style.display = "block";
          this.iNow--;
        };
        break;
      case 1:
        if(oTarget.className == "next") {
          for (i = 0; i < this.iNow; i++) {
            this.aTab[i].style.display = "none";
          };
          this.iNow++;
        }
        break;
    }
    this.aTab[this.iNow].style.display = "block";
    this.fnSwitch();
  },
  fnSwitch: function() {
    for (var i = 0; i < this.aTab.length; i++){
      this.aTab[i].className = "",
      this.aItems[i].style.display = "none"
    }
    this.aTab[this.iNow].className = "current";
    this.aItems[this.iNow].style.display = "block";
    this.oPrev.className = this.iNow == 0 ? "prevNot" : "prev";
    this.oNext.className = this.iNow == this.aTab.length - 1 ? "nextNot" : "next";
  }
}
//应用
fgm.on(window,"load", function() {
  var aItem = fgm.$$$("item");
  for (var i = 0; i < aItem.length; i++) {
    new Tab(aItem[i])
  };
})