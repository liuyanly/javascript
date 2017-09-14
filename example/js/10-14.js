window.onload = function(){
  var oSet = document.getElementById("setting");
  var aInput = oSet.getElementsByTagName("input");
  var oBtn = document.getElementById("btn");
  var oMsg = document.getElementById("msg");

  oBtn.onclick = function() {
    var reg = /^((?!0)\d{1,2}|100)$/;
    if(!reg.test(aInput[0].value)){
      alert("请输入正确的数值：\n\n行数范围【1-100】");
      aInput[0].select();
      return
    }
    else if(!reg.test(aInput[1].value)){
      alert("请输入正确的数值：\n\n列数范围【1-100】");
      aInput[1].select();
      return
    }
    createTable(aInput[0].value,aInput[1].value);
    var oTab = document.getElementsByTagName("table")[0];
    oTab.onclick = function(event){
      var event = event || window.event;
      var oTarget = event.target || event.srcElement;
      if(oTarget.tagName.toUpperCase() === "TD") {
        oMsg.style.display = "block";
        oMsg.innerHTML = "";
        oMsg.innerHTML = "<span>您选择的区域数字是："+oTarget.innerHTML+"，颜色为："+"</span><em style=\"background:"+oTarget.style.backgroundColor+";\"></em><span>"+oTarget.style.backgroundColor+"</span>";
      }
    }
  }
}
function RandomColor(lower,upper){
  return Math.floor(Math.random()*(upper - lower+1)+lower)
}
function getRanColor(){
  var str = this.RandomColor(0, 0xF0F0F0).toString(16);
  while(str.length < 6) str = "0"+str;
  return "#" + str;
}
function createTable(row,col){
  var aTable=document.getElementsByTagName('table');
  if(aTable.length >= 1) {
    for(var i=0;i<aTable.length;i++){
      document.body.removeChild(aTable[i]);
    }
  }
  var oTable = document.createElement("table");
    for (var i = 0; i < row; i++) {
      var oTr = document.createElement("tr");
       oTable.appendChild(oTr);
      for (var j = 0; j < col; j++) {
        var oTd = document.createElement("td");
        oTd.style.background = getRanColor();
        oTd.innerHTML = RandomColor(1,15);
        oTr.appendChild(oTd);
      };
    };
    document.body.appendChild(oTable);
  }
