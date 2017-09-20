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
    var aChildren = element.parentNode.children;
    for (var i = 0; i < aChildren.length; i++) if(aChildren[i] === element) return i;
    return -1;
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
    var oImgBig = byTagname("img",oPic)[0];
    var aSwitch = byTagname("i",oPic);
    var oPrev = aSwitch[0];
    var oNext = aSwitch[1];
    var oPrevAl = byClass("Al",oPic)[0];
    var oNextAr = byClass("Ar",oPic)[0];
    var oUl = byTagname("ul",oPic)[0];
    var aImg = byTagname("img",oUl);
    var iNow = 0;
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].index = i;
        aImg[i].onclick = function(){
            iNow = this.index;
            fnSwitch();
        }
    }
    // if(!!oPrevAl) {
    //     oPrevAl.onclick= function(){
    //         console.log(0);
    //         fnSwitch();
    //         iNow--;
    //     }
    // }
    // if(!!oNextAr) {
    //      oNextAr.onclick= function(){
    //         console.log(1);
    //         iNow++;
    //         fnSwitch();
    //     }
    // }
    // aSwitch.onclick = function(event){
    //     var event = event || window.event;
    //     var oTarget = event.target || event.srcElement;
    //     alert(oTarget);
    //     switch(index(oTarget)){
    //         case 0:
    //             console.log(0)
    //             if(oTarget.className == "Al") {
    //                 iNow--
    //             }
    //             break;
    //         case 1:
    //             if(oTarget.className == "Ar") {
    //                 iNow++
    //             }
    //             break;
    //     }
    //     fnSwitch()
    // }
    function fnSwitch(){
        for (var j = 0; j < aImg.length; j++) {
                aImg[j].className = "";
            }
        aImg[iNow].className = "current";
        aImg[iNow].parentNode.parentNode.style.left = -(aImg[iNow].offsetWidth*iNow)+"px";
        oImgBig.src = aImg[iNow].src.replace(/s68x68/,"s450x450");
        oPrev.className = iNow == 0 ? "Al-disabled":"Al";
        oNext.className = iNow == aImg.length-1 ? "Ar-disabled":"Ar"
    }
}
