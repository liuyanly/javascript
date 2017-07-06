//迷你登录构造函数
function PopupLogin() {
  this.oMask   = document.createElement("div");
  this.oWrap   = document.createElement("div");
  this.oClose  = document.createElement("a");
  this.oIframe = document.createElement("iframe");
}
PopupLogin.prototype = {
  //初始化
  init: function(redirectURL) {
    var that = this,
        ie6  = !!window.ActiveXObject && !window.XMLHttpRequest;
        this.oMask.style.position    = "fixed";
        this.oMask.style.width       = "100%";
        this.oMask.style.top         = this.oMask.style.left = this.oMask.style.right = this.oMask.style.bottom = 0;
        this.oMask.style.background  = "#000";
        this.oMask.style.filter      = "alpha(opacity=60)";
        this.oMask.style.opacity     = 0.6;
        this.oMask.style.zIndex      = 888888;

        this.oWrap.style.position    = "fixed";
        this.oWrap.style.width       = "380px";
        this.oWrap.style.height      = "270px";
        this.oWrap.style.top         = this.oWrap.style.left = "50%";
        this.oWrap.style.margin      = "-140px 0 0 -195px";
        this.oWrap.style.padding     = "10px";
        this.oWrap.style.background  = "#FAFAFA";
        this.oWrap.style.zIndex      = 999999;
        this.oWrap.id                = "J_popup_login";

        this.oClose.href             = "javascript:;"
        this.oClose.style.position   = "absolute";
        this.oClose.style.overflow   = "hidden";
        this.oClose.style.width      = this.oClose.style.height = "17px";
        this.oClose.style.top        = this.oClose.style.right  = "5px";
        this.oClose.style.background = "url(http://img03.taobaocdn.com/tps/i3/T1HQezXcXnXXXXXXXX-123-400.png) 0 -81px";

        this.oIframe.src             = "https://login.taobao.com/member/login.jhtml?style=mini&redirectURL="+ redirectURL +"&full_redirect=true";
        this.oIframe.frameBorder     = 0;
        this.oIframe.scrolling       = "no";
        this.oIframe.style.width     = "380px";
        this.oIframe.style.height    = "270px";

        this.oWrap.appendChild(this.oClose);
        this.oWrap.appendChild(this.oIframe);
        document.body.appendChild(this.oMask);
        document.body.appendChild(this.oWrap);

        if(ie6) {
          this.oMask.style.position = this.oWrap.style.position = "absolute";
          this.oMask.style.height   = Math.max(document.documentElement.scrollHeight, documentElement.documentElement.offsetHeight) + "px";
          this.oWrap.style.margin   = 0;
          this.ie6Fix();
          window.attachEvent("onresize", function(){
            that.ie6Fix()
          })
        }

        this.oClose.onclick = function() {
          that.close()
        }
  },
  // for ie6
  ie6Fix: function() {
    var iScrollTop  = document.documentElement.scrollTop || document.body.scrollTop,
        iScrollLeft = document.documentElement.iScrollLeft || document.body.scrollLeft;
    this.oWrap.style.top = (document.documentElement.clientHeight - 280) / 2 + iScrollTop + "px";
    this.oWrap.style.left = (document.documentElement.clientWidth - 390) / 2 + iScrollLeft + "px";
    document.documentElement.style.textOverflow = "ellipsis";
    this.oWrap.style.setExpression("top", "eval(document.documentElement.scrollTop + "+(parseInt(this.oWrap.style.top) - iScrollTop)+')+"px"');
    this.oWrap.style.setExpression("left", "eval(document.documentElement.scrollLeft +" +(parseInt(this.oWrap.style.left) - iScrollLeft) + ')+"px"')
  },
  //打开迷你登录框
  open: function() {
    this.oMask.style.display = this.oWrap.style.display = "block";
  },
  //关闭迷你登录框
  close: function() {
    this.oMask.style.display = this.oWrap.style.display = "none";
  }
};
//应用
window.onload = function() {
  var oBtn = document.getElementById("J_LinkBuy"),
      oLogin = new PopupLogin();
      oBtn.onclick = function() {
        var oPopup = document.getElementById("J_popup_login"),
        redirectURL = "http%3a%2f%2fwww.taobao.com";

        oPopup ? oLogin.open() : oLogin.init(redirectURL)
      }
}