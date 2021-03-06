function Carselect(){
  this.container = $('div.multi-right ul:first');
  this.highLightClass = "active";
  this.tempAttrKey = "_key";
  this.initialize();
}
Carselect.prototype.initialize = function(){
  var This = this;
  var numCar = 1;
  $('div.multi-left ul:first .css_check').each(function(i){
    $(this).click(function(){
      if($(this).parent().hasClass(This.highLightClass)){
        $(this).parent().removeClass(This.highLightClass)
        This.container.find("li["+This.tempAttrKey+"="+i+"]").remove();
      }else{
        var parent = $(this).parent().addClass(This.highLightClass);
        This.addChild(parent,i);
      }
    })
  })
  $('.multi-right ul:first').on("click","i.car_delete",function(){
    var tempAttrKey = $(this).attr(This.tempAttrKey);
    $('div.multi-left ul:first li').each(function(){
      if($(this).attr(This.tempAttrKey) == tempAttrKey) {
        $(this).removeClass(This.highLightClass)
      }
    })
    $(this).parent().remove();
  })
  $('div.multi-left li').each(function(){
    $(this).find('.icon_minus').click(function(){
      var obj = $(this).parent().find('.num_in');
      if(numCar <= 1) {
       obj.text(numCar = 1);
      }else{
        obj.text( --numCar);
      }
    })
  })
  $('div.multi-left li').each(function(){
    $(this).find('.icon_plus').click(function(){
      var obj = $(this).parent().find('.num_in');
      obj.text(++numCar)
      console.log(numCar);
    })
  })
}
Carselect.prototype.addChild = function(obj,index){
  var This = this;
  var iconClose = $("<i class='car_delete'></i>");
  iconClose.attr(this.tempAttrKey, index);
  obj.attr(this.tempAttrKey, index);
  var target = $("<li><span>"+obj.find('.fl').text()+"</span><span>×</span><span>"+obj.find('.num_in').text()+"</span></li>").append(iconClose);
  target.attr(this.tempAttrKey,index);
  this.container.append(target);
}
$(function(){
  var carselect = new Carselect();
  $('.dropdown_box').click(function(){
    var ul = $(this).find('.dropdown_list');
    if(ul.css("display") == "none"){
      ul.show();
    }else{
      ul.hide();
    }
  });
  $('.dropdown_list li').click(function(){
    var txt = $(this).html();
    $(this).parents('.dropdown_box').find('.dropdown_menu').html(txt);
  })
})