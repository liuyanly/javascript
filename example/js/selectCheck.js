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
  var aOption = byTagName("li",obj);
  var aOptions = [];
  var aArr = [];
  oSelect.onclick = function(){
    oDropDown.style.display = oDropDown.style.display == "block"?"none": "block";
  }
  for (var i = 0; i < aOption.length; i++) {
    aOption[i].onclick = function(){
      var iOption = byClass("css-option",this)[0];
      this.className = this.className == "checkbox"
      ? this.className += " checked"
      : this.className.replace(/\schecked/,"");
      // if(iOption.parentNode.parentNode.className === "checkbox checked") {
      //   aOptions.push(iOption.innerHTML);
      // }else if(iOption.parentNode.parentNode.className === "checkbox") {
      //   aArr.push(iOption.innerHTML);
      // }
      // console.log(aArr);
      if(aOptions.length<1){
         aOptions.push(iOption.innerHTML);
       //   console.log('laogip ')
       }else{
          aOptions.push(iOption.innerHTML);
          for (var i = 0; i < aOptions.length; i++) {
            // console.log(aOptions);
            if(iOption.innerHTML == aOptions[i]){
              console.log(aOptions[i]);
              console.log(iOption.innerHTML);
              aOptions.splice(i,1);
            }else{
              aOptions.push(iOption.innerHTML);
            }
          };
       }
      oSelect.innerHTML = aOptions.join("/");
    }
  };

}
window.onload = function(){
  var aSelectMenu = byClass("selectmenu");
  for( var i = 0 ; i<aSelectMenu.length;i++){
    cssSelect(aSelectMenu[i]);
  }
}