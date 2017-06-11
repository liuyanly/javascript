//获取id、className、tagName
function getId(id) {
	return typeof id === "string" ? document.getElementById(id) : id
}
function getClass(sClass, oParent) {
	var aClass = [];
	var reClass = new RegExp("(^| )" + sClass + "( |$)");
	var aElem = getTagName("*", oParent);
	for (var i = 0; i < aElem.length; i++) {
		reClass.test(aElem[i].className) && aClass.push(aElem[i]);
	}
	return aClass;
}
function getTagName(elem, obj) {
	return (obj || document).getElementsByTagName(elem);
}
//获取最终样式
function getStyle(obj, attr){
	return parseFloat(obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj,null)[attr])
}
window.onload = function() {
	var oBox = getId("box");
	var oScrollBar = getClass("scrollBar", oBox)[0];
	var oList = getClass("list", oBox)[0];
	var oUl = getTagName("ul", oBox)[0];
	var aLi = getTagName("li", oBox);
	var oBarL = getClass("barL", oBox)[0];
	var oBarM = getClass("barM", oBox)[0];
	var oBarR = getClass("barR", oBox)[0];
	var oBar = getClass("bar", oBarM)[0];
	var maxL = oBarM.offsetWidth - oBar.offsetWidth;
	var iMarginRight = getStyle(aLi[0],"marginRight");
	var timer = null;
	var iScale = 0;
	var disX = 0;
	var i = 0;
	//图片列表容器动态设置宽度
	oUl.style.width = (aLi[0].offsetWidth + iMarginRight) * aLi.length + "px";
}