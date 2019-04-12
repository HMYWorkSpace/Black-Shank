require(["require.config"], function () {
    require(["jquery", "header", "footer", "template", "url","zoom",
    "bootstrap"], function ($, header, footer, template, url) {
        header.init();
        class Shopdetail {
            constructor() {
                this.id=Number(location.search.slice(4));
                this.detail();
                this.detailchange();
                this.promise();
                this.paging();
            }
            // 请求数据详情的
            detail() {
                // 这个请求的是上面商品参数详情的
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
                // 这个请求是商品的详情图片的
                $.ajax({
                    url:url.baseUrl+"detail/image",
                    method:"GET",
                    dataType:"json",
                    success:res=>{
                        if(res.res_code===1){
                            this.rendertwo(res.res_body.data.image);
                        }
                    }
                })
            }
            promise(){
                // 请求的是用户的评价 许下承诺是为了后面分页用的
                var _this=this;
                return new Promise(function(resolve,reject){
                    $.ajax({
                        url:url.baseUrl+"user/rating",
                        method:"GET",
                        dataType:"json",
                        success:res=>{
                            if(res.res_code===1){
                              var arr1=res.res_body.data;
                              var arr2=[];
                                arr1.forEach(function(item,index){
                                    if(item.id<=10){
                                        arr2.push(item);
                                    }
                                })
                              _this.renderthree(arr2)
                              resolve(arr1);
                            }
                        }
                    })
                })
            }
            // 分页的点击事件
            paging(){
                var _this=this;
                this.promise().then(function(arr){
                    var pageItem=10;
                    //   pageItem是每页显示的条数
                    var pageNum=Math.ceil(arr.length/pageItem);
                    //   pageNum是总的页数
                    for(var i=1;i<=pageNum;i++){
                        // 循环是根据计算的总的页数生成几个点击的按钮
                        if(i===1){
                            // 进入页面第一页的class为active
                            $(`<li class="click-page active"><a href=""javascript:; class="page">${i}</a></li>`).insertBefore($("#next-page"))
                        }else{
                            $(`<li class="click-page"><a href=""javascript:; class="page">${i}</a></li>`).insertBefore($("#next-page"))
                        }
                    }
                    var nowPage=Number($(".active").children().html());
                    $("#pagination").click(function(event){
                        var $target=$(event.target);
                        if($target.is(".page")){
                            // 点击当前页的事件
                            $(".click-page").each(function(){
                                $(this).removeClass("active")
                            })
                            $target.parent().addClass("active");
                            nowPage=Number($target.html());
                            console.log(nowPage);
                            var arr3=[];
                            arr.forEach(function(item){
                                if(item.id>(nowPage-1)*pageItem && item.id<=nowPage*pageItem){
                                    arr3.push(item);
                                }
                            })
                            _this.renderthree(arr3);
                            return false;
                        }else if($target.is(".next")){
                            // 点击下一个的事件
                            $(".click-page").each(function(){
                                $(this).removeClass("active")
                            })
                            console.log(nowPage);
                            if(++nowPage>pageNum) nowPage=pageNum;
                            console.log(nowPage);
                            $(".click-page").eq(nowPage-1).addClass("active")
                            var arr4=[];
                            arr.forEach(function(item){
                                if(item.id>(nowPage-1)*pageItem && item.id<=nowPage*pageItem){
                                    arr4.push(item);
                                }
                            })
                            _this.renderthree(arr4);
                        }else if($target.is(".prev")){
                            // 点击上一个按钮的事件
                            $(".click-page").each(function(){
                                $(this).removeClass("active")
                            })
                            if(--nowPage<1) nowPage=1;
                            $(".click-page").eq(nowPage-1).addClass("active")
                            var arr5=[];
                            arr.forEach(function(item){
                                if(item.id>(nowPage-1)*pageItem && item.id<=nowPage*pageItem){
                                    arr5.push(item);
                                }
                            })
                            _this.renderthree(arr5);
                        }
                    })
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
                        var objTop = (screenHeight - obj.height())/2;
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
                        "num":num
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