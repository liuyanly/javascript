function byClass(sClass, oParent){
    var aClass = [];
    var reClass = new RegExp("(^| )"+sClass+"( |$)");
    var aElem = byTagname("*",oParent);
    for (var i = 0; i < aElem.length; i++) {
       reClass.test(aElem[i].className) && aClass.push(aElem[i])
    }
    return aClass;
}
 function byTagname(elem, obj){
    return (obj || document).getElementsByTagName(elem)
 }
 function index(element){
    var aChildren = element.parentNode.children, i;
    for(i = 0; i < aChildren.length; i++) if(aChildren[i] === element) return i;
    return -1;
 }
 function on(element,type,handler){
    return element.addEventListener?element.addEventListener(type,handler,false):element.attachEvent("on"+type,handler);
 }
window.onload = function() {
    // 内容标签切换
    var oDiv = document.getElementById("tab");
    var oLi = oDiv.getElementsByTagName("div")[0].getElementsByTagName("li");
    var aCon = oDiv.getElementsByTagName("div")[1].getElementsByTagName("div");
    var timer = null;
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function() {
            show(this.index);
        }
    }
    function show(a) {
        index = a;
        for (var j = 0; j < oLi.length; j++) {
            oLi[j].className = "";
            // aCon[j].className = "";
            aCon[j].style.display="none";
        }
        oLi[index].className = "cur";
        clearInterval(timer);
        timer = setInterval(function() {
            aCon[index].style.display="block";
        },
        5)
    }
    //图片预览
    var oPic = byClass("Gpic")[0];
    var small = byClass("tb-box",oPic)[0];
    var smallImg = byTagname("img",small)[0];
    var mask = byTagname("span",small)[0];
    var layer = byTagname("span",small)[1];
    var big = byClass("zoom-pic",oPic)[0];
    var bigImg = byTagname("img",big)[0];
    var aSwitch = byTagname("i",oPic);
    var oPrev = aSwitch[0];
    var oNext = aSwitch[1];
    var oUl = byTagname("ul",oPic)[0];
    var aImg = byTagname("img",oUl);
    var iNow = 0;
    // zoom
    small.onmousemove = function(event){
        var event = event || window.event;
        this.style.cursor = "move";
        layer.style.display = big.style.display = "block";
        var iT = event.clientY -this.parentNode.parentNode.offsetTop - layer.clientHeight/2;
        var iL = event.clientX -this.parentNode.parentNode.offsetLeft - layer.clientWidth/2;
        var maxT = this.clientHeight - layer.clientHeight;
        var maxL = this.clientWidth - layer.clientWidth;
        iT <= 0 && (iT = 0);
        iL <= 0 && (iL = 0);
        iT >= maxT && (iT = maxT);
        iL >= maxL && (iL = maxL);

        layer.style.top = iT + "px";
        layer.style.left = iL + "px";
        var scaleX = iL / (this.clientHeight - layer.clientHeight);
        var scaleY = iT / (this.clientWidth - layer.clientWidth);
        bigImg.style.left = -scaleX * (bigImg.clientWidth - big.clientWidth) + "px";
        bigImg.style.top = -scaleY * (bigImg.clientHeight - big.clientHeight) + "px";
    }
    small.onmouseout = function(){
        layer.style.display = big.style.display = "none";
    }
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].index = i;
        aImg[i].onclick = function(){
            iNow = this.index;
            fnSwitch();
        }
    }
        oPrev.onclick= function(){
            if(iNow > 0) {
                iNow--;
                fnSwitch();
            }
        }
        oNext.onclick= function(){
            if(iNow < aImg.length){
                iNow++;
                iNow >= aImg.length && (iNow = aImg.length - 1);
                fnSwitch();
            }
        }
    function fnSwitch(){
        for (var j = 0; j < aImg.length; j++) {
                aImg[j].className = "";
            }
        aImg[iNow].className = "current";
        oUl.style.left = -(((aImg[0].offsetWidth+7)/1.8)*iNow)+"px";
        smallImg.src = bigImg.src =  aImg[iNow].src.replace(/s68x68/,"s450x450");5
        oPrev.className = iNow == 0 ? "Al-disabled":"Al";
        oNext.className = iNow == aImg.length-1 ? "Ar-disabled":"Ar"
    }
}
