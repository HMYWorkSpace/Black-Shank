require(["require.config"], function () {
    require(["jquery","header","url","template","swiper"],function($,header,url,template,Swiper){
        header.init().then(function(){
            $("#header-ol").remove();
            // 把多余的ol删除
            var addLi=$("<li></li>");
            var addA=$("<a></a>").text("Global");
            $(addLi).append(addA);
            $("#header-ul").append(addLi);
            $("ul li:nth-child(1)>a").text("首页");
            $("ul li:nth-child(2)>a").text("产品");
            $("ul li:nth-child(3)>a").text("商城");
            // 因为首页的ul导航和引入的header不一样 所以添加一个li 和改变前三个li里面的文本
            $("ul li:nth-child(3)>a").attr("href","/html/shoplist.html")
            $(".head").attr("style",'background:rgba(0,0,0,0)');
            // 让头部的背景颜色变成透明的
        })
        class Index{
            constructor(){
                this.advert();
                this.lunbo();
            }
            advert(){
                $.ajax({
                    // jquery里面的ajax请求
                    url:url.baseUrl+"advert",
                    // 请求接口的地址
                    method:"GET",
                    // 请求方式
                    dataType:"json",
                    // 得到的数据类型
                    success:function(res){
                    // 请求成功执行的函数
                        if(res.res_code===1){
                            // 值为1就是请求成功了
                            let list=res.res_body.list;
                            // list就是存数据的那个数组
                            var html=template("advert-list",{list});
                            // template 方法里面有两个参数 第一个是HTML文件里面那个script的ID,第二个是要用到的数据
                            $("#advert").html(html);
                            // 然后把html放入HTML文件里面需要放内容的盒子里面
                            $(".text-content").first().empty();
                            var span=$("<span></span>");
                            $(".text-content").first().append(span);
                        }
                    }
                })
            }
            lunbo(){      
                  new Swiper ('.swiper-container', {
                  direction: 'horizontal', // 切换选项
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
        new Index;
    })
})