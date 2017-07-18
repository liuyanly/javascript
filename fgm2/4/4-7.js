window.onload = function () {
  var aDiv = document.getElementsByTagName("div");
  var aInput = document.getElementsByTagName("input");
  var bS1 = bS2 = true;
  var aTmp = [];
  aInput[0].onclick = function() {
    aTmp = getArray(aDiv[0].innerHTML);
    bS1?
    (aTmp.shift(), this.value = this.value.replace("删除","添加"),bS1 = false):
    (aTmp.unshift("January(1)"),this.value = this.value.replace("添加","删除"),bS1 = true)
    aDiv[0].innerHTML = aTmp.join()
  }
  aInput[1].onclick = function() {
    aTmp = getArray(aDiv[0].innerHTML);
    bS2?
    (aTmp.pop(),this.value = this.value.replace("删除","添加"),bS2 = false):
    (aTmp.push("December(12)"),this.value = this.value.replace("添加","删除"),bS2 = true);
    aDiv[0].innerHTML = aTmp.join();
  }
  aInput[2].onclick = function() {
    aTmp = getArray(aDiv[1].innerHTML);
    aDiv[1].innerHTML = aTmp.concat(aTmp).toString().replace(/\s/g,"");
  }
  aInput[3].onclick = function() {
    aTmp = getArray(aDiv[1].innerHTML);
    aTmp.length = 10;
    aDiv[1].innerHTML = aTmp.join();
  }
  aInput[4].onclick = function() {
    aTmp = ["red","green","blue","white","yellow","black","brown"];
    aDiv[2].innerHTML = aTmp.join();
  }
  aInput[5].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    aTmp.splice(0,3);
    aDiv[2].innerHTML = aTmp.join();
  }
  aInput[6].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    aTmp.splice(1,2);
    aDiv[2].innerHTML = aTmp.join();
  }
  aInput[7].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    aTmp.splice(1,0,"orange","purple");
    aDiv[2].innerHTML = aTmp.join();
  }
  aInput[8].onclick = function() {
    aTmp = getArray(aDiv[2].innerHTML);
    aTmp.splice(1,2,"#009900","#0000ff");
    aDiv[2].innerHTML = aTmp.join();
  }
  function getArray(str) {
    aTmp.length = 0;
    str = str.split(",");
    for(var i in str) aTmp.push(str[i]);
    return aTmp
  }

}