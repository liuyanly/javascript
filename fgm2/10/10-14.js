/*
  1） 任意输入行数或列数，生成对应表格
  2） 行数，列数必须为正整数类型，否则提示非法；
     （这里用正则限制1-100，避免网友测试输入过大值造成浏览器假死）
  3） 在生成表格的单元格中随机填入1-15之间的随机数，并给每个单元格设置随机背景颜色；
  4） 点击任意单元格，将将其和背景颜色输出显示;
  5） 效率要求：100*100生成表格时间小于3秒
  6） 代码中要用到事件代理机制
  7） 设计一种简单机制，使单元格数小于255*255*255时，颜色不重复
  8） 要求符合w3c验证,兼容IE,Firefox,chrome等浏览器
 */
 function CreateTable() {
  this.oTable  = null;
  this.bgColor = 0;
 }
 CreateTable.prototype = {
  init: function(row,col) {
    var oFrag = document.createDocumentFragment();
    var oTemp = document.createElement("div");
    var oBody = document.body;
    var aRow = [];
    var aCol = [];
    for(var i = row; i--;){
      aCol.length = 0;
      for(var j = col; j--;){
        this.bgColor = this.getRanColor();
        aCol.push("<td style=\"background:"+this.bgColor+";\">"+this.randomRange(1, 15)+"</td>");
      }
      aRow.push("<tr>"+aCol.join("")+"</tr>")
    }
    oTemp.innerHTML = "";
    oTemp.innerHTML = "<table><tbody>" + aRow.join("")+"</tbody></table>";
    while(oTemp.firstChild) oFrag.appendChild(oTemp.firstChild);
    this.oTable && oBody.removeChild(this.oTable);
    oBody.appendChild(oFrag);
    this.oTable = oBody.lastChild
  },
  randomRange: function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1) + lower)
  },
  getRanColor: function() {
    var str = this.randomRange(0, 0xF0F0F0).toString(16);
    while(str.length < 6) str = "0"+ str;
    return "#" + (this.bgColor.toString().replace("#","").toString(10)===str.toString(10)?str+100000:str)
  }
 }
 window.onload = function() {
  var oTab = new CreateTable();
  var oRow = document.getElementById("row");
  var oCol = document.getElementById("col");
  var oBtn = document.getElementById("btn");
  var oMsg = document.getElementById("msg");

  oBtn.onclick = function() {
    var reg = /^(?!0)\d{1,2}|100$/;
    if(!reg.test(oRow.value)) {
      alert("请输入正确的数值：\n\n列数范围【1-100】");
      oRow.select();
      return
    }
    else if(!reg.test(oCol.value)) {
      alert("请输入正确的数值：\n\n行数范围【1-100】");
      oCol.select();
      return
    }
    //隐藏信息区域
    oMsg.style.display = "none";
    //防止内存泄漏
    oTab.oTable && (oTab.oTable.onclick = null);
    //重新渲染表格
    oTab.init(oRow.value, oCol.value);
    //事件代理
    oTab.oTable.onclick = function(e) {
      e = e || event;
      var oTarget = e.target || e.srcElement;
      if(oTarget.tagName.toUpperCase() === "TD") {
        oMsg.style.display = "block";
        oMsg.innerHTML = "";
        oMsg.innerHTML = "<span>您选择的区域数字是："+oTarget.innerHTML+
                         "，颜色为："+"</span><em style=\"background:"+oTarget.style.backgroundColor+
                         ";\"></em><span>"+oTarget.style.backgroundColor+"</span>";
      }
    }
  }
 }