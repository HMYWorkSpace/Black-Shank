require(["require.config"], function () {
    require(["jquery", "header", "footer", "template", "url","zoom",
    "bootstrap"], function ($, header, footer, template, url) {
        header.init();
        class Shopdetail {
            constructor() {
                this.id=Number(location.search.slice(4));
                console.log(this.id);
                this.detail();
                this.detailchange();
            }
            // 请求数据详情的
            detail() {
                // 这个请求的时上面商品参数详情的
                $.ajax({
                    url: url.baseUrl + "shop/detail",
                    method: "GET",
                    dataType: "json",
                    success: res => {
                        if (res.res_code === 1) {
                            this.renderone(res.res_body.data);
                        }
                    }
                })
                // 这个请求是商品的详情和用户的评价和商品详细参数的
                $.ajax({
                    url:url.baseUrl+"detail/image",
                    method:"GET",
                    dataType:"json",
                    success:res=>{
                        if(res.res_code===1){
                            // var list=res.res_body.data.image;
                            // console.log(list);
                            this.rendertwo(res.res_body.data.image);
                        }
                    }
                })
                $.ajax({
                    url:url.baseUrl+"user/rating",
                    method:"GET",
                    dataType:"json",
                    success:res=>{
                        if(res.res_code===1){
                          this.renderthree(res.res_body.data)
                          console.log(res.res_body.data)
                        }
                    }
                })
            }
            // 把数据放到页面当中
            renderone(data) {
                var html = template("shopdetail", { ...data.detail });
                $("#shop-detail").html(html);
                this.num=$("#goods-num").html();
                this.zoom();
                this.addminus();
                this.gocar();  
                this.showCenter();
                this.chooseversion();
                this.choosecolor();
            }
            rendertwo(list){
                var html=template("detailimage",{list});
                $("#product-detail").html(html);

            }
            renderthree(list){
                var html=template("userrating",{list});
                $("#user-rating").html(html);
            }
            // 下面数据详情的切换
            detailchange() {
                var li = $("#change-btn li");
                var lastIndex = 0;
                var div = $("#specific-content div");
                li.on("click", function () {
                    li.eq(lastIndex).removeClass("ac");
                    div.eq(lastIndex).removeClass("ac");
                    $(this).addClass("ac");
                    div.eq($(this).index()).addClass("ac");
                    lastIndex = $(this).index();
                })
            }
            zoom (){
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'   
                });
            }
            // 增加删除商品数量
            addminus(){
                $("#add-num").on("click",()=>{
                     this.num++;
                    //  点加的时候数量增加
                    $("#goods-num").html(this.num);
                })
                $("#minus-num").on("click",()=>{
                    // this.num--;
                    if(--this.num<1) this.num=1;
                    $("#goods-num").html(this.num);
                })
            }
            // 点击加入购物车后  然后点击购物车结算 跳转到购物车的事件
            gocar(){
                $("#go-car").on("click",function(){
                    location.href="/html/car.html";
                })
            }
            // 弹框居中的方法
            showCenter(){
                $("#add-car").on("click",()=>{
                    var obj=$(".modal-content");
                    function center(){
                        var screenWidth = $(window).width();
                        var screenHeight = $(window).height();
                        var objLeft = (screenWidth - obj.width())/2 ;
                        console.log(screenWidth);
                        console.log(screenHeight);
                        var objTop = (screenHeight - obj.height())/2+$(window).scrollTop();
                      obj.css({left: objLeft + 'px', top: objTop + 'px'});
                    }
                    center();
                    // 窗口改变大小的时候能一直居中
                    $(window).resize(function(){
                        center();
                    });
                    this.savecookie();
                })
            }
            // 给选择版本绑定点击事件
            chooseversion(){
                var span=$(".version span");
                var vspan=$("h3 span").eq(1);
                var lastIndex=0;
                span.on("click",function(){
                    span.eq(lastIndex).removeClass("active");
                    $(this).addClass("active");
                    lastIndex=$(this).index();
                    vspan.html($(this).html());
                })
            }
            // 选择颜色绑定的点击事件
            choosecolor(){
                var span=$(".color span");
                var lastIndex=0;
                var cspan=$("h3 span").eq(2);
                span.on("click",function(){
                    span.eq(lastIndex).removeClass("active");
                    $(this).addClass("active");
                    lastIndex=$(this).index();
                    cspan.html($(this).html());
                })
            }
            // 把选中的版本样式存cookie 以便在购物车页面获取数据
            savecookie(){
                    var id=this.id;
                    var name=$("h3 span").eq(0).html();
                    var version=$("h3 span").eq(1).html();
                    var color=$("h3 span").eq(2).html();
                    var price=$("#price-now").html().slice(1);
                    var num=Number($("#goods-num").html());
                    console.log(num);
                    var obj={
                        "id":id,
                        "name":name,
                        "version":version,
                        "color":color,
                        "price":price,
                        "num":1
                    }
                    var i;
                    var shopnum=localStorage.getItem("shopnum");
                    if(shopnum){
                        shopnum=JSON.parse(shopnum);
                       if(shopnum.some(function(item,index){
                            i=index;
                            return item.id===id;
                       })){
                        shopnum[i].num= num>1? shopnum[i].num+num : ++shopnum[i].num;
                       }else{
                           shopnum.push(obj);
                       }
                    
                    }else{
                        shopnum=[obj];
                    }
                    localStorage.setItem("shopnum",JSON.stringify(shopnum));
            }
        }
        new Shopdetail();
    })
})