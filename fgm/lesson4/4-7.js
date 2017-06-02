window.onload = function () {
  var aInput = document.getElementsByTagName("input");
  var aDiv = document.getElementsByTagName("div");
  var aTmp = [];
  var bS1 = bS2 = true;
  aInput[0].onclick = function() {
    aTmp = getArray(aDiv[0].innerHTML);
    bS1 ?
    //删除第一项,shift()方法
    (aTmp.shift(),this.value = this.value.replace("删除","添加"),bS1 = false):
    // 添加第一项，unshift()方法
    (aTmp.unshift("January(1)"),this.value = this.value.replace("添加","删除"),bS1 = true);
    aDiv[0].innerHTML = aTmp.join();
  }
  aInput[1].onclick = function() {
    aTmp = getArray(aDiv[0].innerHTML);
    bS2 ?
    // 删除最后一项，pop()方法
    (aTmp.pop(),this.value = this.value.replace("删除","添加"),bS2 = false):
    // 添加最后一项，push()方法
    (aTmp.push("December(12)"),this.value = this.value.replace("添加","删除"),bS2 = true);
    aDiv[0].innerHTML = aTmp.join();
  }
  // 复制，concat()方法
  aInput[2].onclick = function() {
    aTmp = getArray(aDiv[1].innerHTML);
    //输出
    aDiv[1].innerHTML = aTmp.concat(aTmp).toString().replace(/\s/g,"")
  }
  // 还原,利用数组的length特点
  aInput[3].onclick = function() {
    aTmp = getArray(aDiv[1].innerHTML);
    //设置数组的长度
    aTmp.length = 10;
    //输出
    aDiv[1].innerHTML = aTmp.join()
  }
  // 还原
  aInput[4].onclick = function() {
    aTmp = ["red","green","blue","white","yellow","black","brown"];
    // 输出
    aDiv[2].innerHTML = aTmp.join();
  }
  // 删除前三项
  aInput[5].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    //删除，0开始，删除3个
    aTmp.splice(0,3);
    // 输出
    aDiv[2].innerHTML = aTmp.join()
  }
  // 删除第二到第三项
  aInput[6].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    //删除，2开始，删除3个
    aTmp.splice(1,2)
    //输出
    aDiv[2].innerHTML = aTmp.join();
  }
  // 在第二项后插入(orange,purple)
  aInput[7].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    // 插入，2开始，插入"orange","purple"
    aTmp.splice(1,0,"orange","purple")
    //输出
    aDiv[2].innerHTML = aTmp.join();
  }
  // 替换第二项和第三项
  aInput[8].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    // 插入，2开始替换
    aTmp.splice(1,2,"#009900","#0000ff");
    //输出
    aDiv[2].innerHTML = aTmp.join()
  }
  // 将div中的内容转化为数组
  function getArray(str) {
    aTmp.length = 0;
    str = str.split(",")
    for(var i in str) aTmp.push(str[i]);
    return aTmp;
  }
}