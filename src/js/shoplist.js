require(["require.config"],function(){
    require(["jquery","header","footer","url","template","swiper"],function($,header,footer,url,template,Swiper){
        header.init().then(function(){
            $(".head").attr("style",'background:rgba(0,0,0,0)');
            // 让头部的背景颜色变成透明的
        });
        class Shoplist{
            constructor(){
                this.goodslist();
                this.lunbo();
            }
            goodslist(){
                $.ajax({
                    url:url.baseUrl+"product",
                    method:"GET",
                    dataType:"json",
                    success:function(res){
                       if(res.res_code===1){
                           let list=res.res_body.list;
                           var html=template("shoplist",{list});
                           $("#new-list").html(html);
                        }
                    }
                })
                $.ajax({
                    url:url.baseUrl+"list/phone",
                    method:"GET",
                    dataType:"json",
                    success:function(res){
                       if(res.res_code===1){
                           let list=res.res_body.list;
                           var html=template("phonelist",{list});
                           $("#phone-list").html(html);
                        }          
                    }       
                })
                $.ajax({
                    url:url.baseUrl+"list/hand/shank",
                    method:"GET",
                    dataType:"json",
                    success:function(res){
                       if(res.res_code===1){
                           let list=res.res_body.list;
                           console.log(list);
                           var html=template("shanklist",{list});
                           console.log(html);
                           $("#hand-shank-list").html(html);
                        }          
                    }       
                })
                $.ajax({
                    url:url.baseUrl+"list/model",
                    method:"GET",
                    dataType:"json",
                    success:function(res){
                       if(res.res_code===1){
                           let list=res.res_body.list;
                           console.log(list);
                           var html=template("modellist",{list});
                           console.log(html);
                           $("#model-list").html(html);
                        }          
                    }       
                })
                $.ajax({
                    url:url.baseUrl+"list/data",
                    method:"GET",
                    dataType:"json",
                    success:function(res){
                       if(res.res_code===1){
                           let list=res.res_body.list;
                           console.log(list);
                           var html=template("datalist",{list});
                           console.log(html);
                           $("#data-wire-list").html(html);
                        }          
                    }       
                })                                              
            }
            lunbo(){      
                new Swiper ('.swiper-container', {
                direction: 'vertical', // 切换
                loop: true, // 循环模式选项
                autoplay:true, // true可以自动播放 false不能自动播放
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                  // 分页器外面的div的class名字
                  clickable :true,
                  // 如果为true时点击分页器按钮可以切换 false不能切换
                },
              })       
            }
        }
        new Shoplist();
    })
})