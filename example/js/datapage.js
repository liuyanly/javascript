window.onload = function(){
  var jobdata = JSON.parse(document.getElementById("jobdata").innerText);
  // 接受数据
  // 调用
  var f0 = new weify(jobdata,{
    k1:['全部','变电检修','变电运行','测试','带电作业','电力调度','发电','基建','教员','试验','输电运检','物流仓储','营销与配电'],
    k2:['全部','昭通','西双版纳','曲靖','昭通','红河州','大理','德宏','普洱','丽江','临沧','昆明','文山','楚雄','玉溪','保山','迪庆','怒江']
  });
  function weify(udata,key){
    // 创建自定义dom结构
    document.getElementById('job_box').innerHTML = '<div id="search_key"><span id="select_box"></span></div>'
    +'<div id="show_list"><table id="job_list"></table></div>'
    +'<div id="search_msg"><button class="fy_btn" data="prev">&lt;</button><ul id="allPage"></ul><button class="fy_btn" data="next">&gt;</button></div>';

    // 操作节点
    var select_box = document.getElementById('select_box'),//下拉框
        job_list = document.getElementById('job_list'),
        search_msg = document.getElementById('search_msg'),
        keyword = document.getElementById('keyword'),
        AllPage = document.getElementById('allPage'),
        btn = search_msg.getElementsByTagName('button');
    //初始设置
    var setnum = 12,//设置每页数目
        setym = 8,//设置页码显示数量，当前+1
        nowpage,//当前页
        allpage,
        tempdata = [], //存放
        startnum = 0, //数据节点
        sek = new Array(),
        ymcase = '',//页面缓存
        isUpym = 1,//前后更多更新页码next:1.prev:2,stop:0;
        ymstatus = '',//页面DOM状态
        opstatus = '',//操作状态
        Condition = function(){
          var temp = [],allnum = 0;
          var str0 = (arguments[0]!= 1)?arguments[0]:'';//ie对象空变1
          var str1 = (arguments[1]!= 1)?arguments[1]:'';
          for(var i in this){
            if(this[i]['jobtype'].match(str0)&&this[i]['city'].match(str1)){
              temp.push(this[i]);
              allnum+=1;
            }
          }
          return [temp,allnum]
        },
        Makelist = function(){
          // 注意table在ie9以下无法使用innerHTML,就用列表吧，
          job_list.innerHTML = '<tr class="tit"><td>招聘单位</td><td>职位分类</td><td>工作地点</td><td>申请职位</td></tr></table>';
          AllPage.innerHTML = '';
          if(nowpage == 0){
            job_list.innerHTML = '<tr class="tit"><td>招聘单位</td><td>职位分类</td><td>工作地点</td><td>申请职位</td></tr><tr><td colspan="4"><span style="color:red;width:100%;text-align:center;line-height:50px;display:block;">暂无数据！</span></td></tr>';
            return false;
          }
          // 职位列表缓存
          var templist = document.createDocumentFragment();
          // 生成页码
          if(isUpym == 1 || isUpym == 2){
            var pnumberlist = document.createDocumentFragment();
            var startp='',endp='';
            switch(isUpym){
              case 1:
                startp = nowpage,endp = nowpage+setym;
                if(startp != 1 && opstatus == 'next'){startp -= 1;endp-=1;}
              break;
              case 2:
                startp = nowpage - setym, endp=nowpage+setym;
                if(startp == 0 || opstatus == 'prev') {startp+=1;endp+=1};
              break;
            }
            for(var p=startp; p<=endp;p++){
              if(p < 1 || p > allpage){AllPage.appendChild(pnumberlist);break}
              var c_pli = document.createElement("li");
                c_pli.innerText = p;
                pnumberlist.appendChild(c_pli);
            }
            AllPage.appendChild(pnumberlist);
            ymcase = allpage.innerHTML;
            isUpym = 0;
          }else{
            AllPage.innerHTML = ymcase;
          }
          // 点击页码跳到某页
          for(var yi = 0; yi< AllPage.children.length;yi++){
            AllPage.children[yi].onclick = (function(index){
              return function(){
                nowpage = Number(AllPage.children[index].innerText);
                if(index == setym){isUpym=1;}
                if(index == 0 && AllPage.children[index].innerText != 1){
                  isUpym = 2
                }
                Optpage('toPage');
              }
            })(yi);
            if(AllPage.children[yi].innerText == nowpage){
              AllPage.children[yi].className = 'act';
              ymstatus = yi;
            }
          }
          // 居中，按钮显示隐藏
          btn[0].style.display = (nowpage == 1)?'none':'block';
          btn[1].style.display = (nowpage == allPage)?'none':'block';
          search_msg.style.width = Number(AllPage.children.length*30+40)+'px';
          // 生成职位dom
          for(var i = startnum;i<Number(startnum+setnum);i++){
            if(i>=this.length){
              job_list.appendChild(templist);
              return false;
            }
            var c_li = document.createElement('tr');
            c_li.innerHTML = '<td class="com">'+this[i]['com']+'</td><td>'+this[i]['jobtype']+'</td><td>'+this[i]['city']+'</td><td><a href="http://nullno.com" target="_blank">立即申请</a></td>';
            templist.appendChild(c_li);
          }
          job_list.appendChild(templist);
        },
        Searchkey = function(Co,Ma,obj,key){
          var resdata = Co.apply(obj,key);
            startnum = 0;
            tempdata = resdata[0];
            allPage = Math.ceil(resdata[i]/setnum);
            isdata=(resdata[0]!='')?1:0;
            nowpage = isdata;
            Ma.apply(resdata[0]);
        },
        Optpage = function(){
          switch(arguments[0]){
            case 'prev':
              if(nowpage == 1) return false;
                nowpage -= 1;
                startnum -= setnum;
              if(ymstatus == 0 ){isUpym=2;}
            break;
            case 'next':
              if(nowpage == allPage) return false;
                nowpage += 1;
                startnum += setnum;
              if(ymstatus == allPage.children.length-1){isUpym=1;}
            break;
            case 'toPage':
              if(nowpage > allpage || nowpage < 1) return false;
              startnum = (nowpage - 1)*setnum;
            break;
            default:
              return false;
            break;
          }
          opstatus = arguments[0];
          Makelist.apply(tempdata);
        };
        sek[0]='',sek[1]='';
        Searchkey(Condition,Makelist,udata,sek);
        // 下拉框搜索
        var tempselect = document.createDocumentFragment();
        var typetext = ['职位分类','工作地点'],
            tn = 0;
            for(var i in key){
              var c_se = document.createElement('div');
                  c_se.setAttribute('id',i);
              var c_label = document.createElement('ul');
                  c_label.innerText = typetext(tn)+':';
                  tn++;
              var c_ul = document.createElement('ul');
                  c_se.appendChild(c_label);
                  c_se.appendChild(c_ul);
              for(var n in key[i]){
                var c_op = document.createElement('li');
                if(n != 0) {
                  c_op.setAttribute('value',key[i][n]);
                }else{
                  c_op.setAttribute('value','')
                }
                // 多选
                c_op.onclick = function(){
                  for(var c=0,l=this.parentNode.childNodes.length;c<l;c++){
                    this.parentNode.childNodes[c].className='';
                  }
                  if(this.parentNode.parentNode.getAttribute('id')=='k1'){
                    sek[0]=this.getAttribute('value');
                  }else{
                    sek[1]=this.getAttribute('value');
                  }
                  isUpym = 1;
                  this.className = 'act';
                  Searchkey(Condition,Makelist,udata,sek)
                }
                c_op.innerText=key[i][n];
                c_ul.appendChild(c_op);
              }
              c_ul.childNodes[0].className='act';
              templist.appendChild(c_se);
            }
            select_box.appendChild(templist);
  }
  // 点击翻页
  for(var i = 0; i <btn.length;i++){
    btn[i].onclick=(function(index){
      return function(){
        Optpage(btn[index].getAttribute('data'));
      }
    })(i)
  }
  // 过滤空格字符
  function innoreSpaces(string){
    var temp = "";
    string = '' + string;
    splitstring = string.split(" ");
    for(i = 0; i < splitstring.length;i++)
    temp += splitstring[i];
    return temp;

  }
}