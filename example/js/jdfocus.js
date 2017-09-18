function byId(id) {
	return typeof id === "string" ? document.getElementById(id):id
}
function byClass(sClass, oParent){
	var aClass = [];
	var reClass = new RegExp("(^| )" + sClass + "( |$)");
	var aElem = byTagName("*",oParent);
	for (var i = 0; i < aElem.length; i++) {
		reClass.test(aElem[i].className) && aClass.push(aElem[i]);
	}
	return aClass;
}
function byTagName(elem,obj){
	return (obj || document).getElementsByTagName(elem);
}
function getStyle(element,attr){
	return parseFloat(element.currentStyle ? element.currentStyle(attr):getComputedStyle(element,null)[attr])
}
function jdFocus(obj){
	var oSlider = byClass("slider_main")[0];
	var aItem = byClass("slider_item",oSlider);
	var oIndicator = byClass("slider_indicator",oSlider)[0];
	var aBtn = byTagName("i",oIndicator);
	var oPrev = byClass("slider_control_prev",oSlider)[0];
	var oNext = byClass("slider_control_next",oSlider)[0];
	var playTimer = null;
	var index = 0;
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;
		aBtn[i].onmouseover = function(){
			show(this.index);
		}
	}
	playTimer = setInterval(function(){
		index++;
		index == aItem.length && (index = 0)
		show(index)
	},3000)
	oSlider.onmouseover = function(){
		clearInterval(playTimer)
	}
	oSlider.onmouseout = function(){
		playTimer = setInterval(function(){
			index++;
			index == aItem.length && (index = 0)
			show(index)
		},3000)
	}
	oPrev.onclick = function(){
		index == 0 && (index = aItem.length);
		index--;
		show(index)
	}
	oNext.onclick = function(){
		index++;
		index == aItem.length && (index = 0)
		show(index)
	}
	function show(a){
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].className = "slider_indicator_btn";
		}
		aBtn[a].className = "slider_indicator_btn slider_indicator_btn_active";

		for (var j = 0; j < aItem.length; j++) {
			doMove(aItem[j],0)
			aItem[j].style.zIndex = 0;
		}
		doMove(aItem[a], 100)
		aItem[a].style.zIndex = 1;
	}
	function doMove(obj, iTarget){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var iCur = getStyle(obj,"opacity");
			iCur = iCur * 100;
			var iSpeed = (iTarget - iCur)/5;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur == iTarget) {
				clearInterval(obj.timer)
			}else{
				obj.style.opacity = (iSpeed + iCur)/100;
				obj.style.filter = "alpha(opacity="+iSpeed+iCur+")";
			}
		},30)
	}
}
window.onload = function() {
	jdFocus();
}