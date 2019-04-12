require(["require.config"], function () {
    require(["jquery", "header", "footer"], function ($, header, footer) {
        header.init();
        class Car {
            constructor() {
                this.shopnum=JSON.parse(localStorage.getItem("shopnum"));
                this.drawcookie(); 
                this.n=$(".check").length;
                this.delete(); 
                this.addminus();
                this.allCheck();
                this.check();   
                this.caclallnum();
                this.caclchoosenum();       
            }
            // 提取cookie  然后把数据渲染到表格里面
            drawcookie() {
                if(this.shopnum.length>0){ 
                    $("#show-car").show();
                    $("#car-content").hide();
                    $("#settle-accounts").show;
                    var html="";
                    this.shopnum.forEach(function (item,index) {
                        html += `
                            <tr data-id="${item.id}">
                                <td>
                                    <input type="checkbox" class="check" id="check-${index}" checked="checked">
                                    <label for="check-${index}">
                                        <span class="choose-state checked-state"></span>
                                    </label>
                                </td>
                                <td class="need-dis">
                                    <div class="left-img">
                                        <img src="/img/5.jpg" alt="">
                                    </div>
                                    <div class="right-name">
                                        <p>${item.name}</p>
                                        <p>${item.version}&nbsp;${item.color}</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="buy-num">       
                                        <button class="num-minus">-</button>
                                        <i class="goods-num">${item.num}</i>
                                        <button class="num-add">+</button>
                                    </div>
                                </td>
                                <td>￥<i>${item.price}</i></td>
                                <td>待付款</td>
                                <td>
                                    <span class="glyphicon glyphicon-trash del-btn" aria-hidden="true"></span>
                                </td>
                            </tr>
                            `;
                    })
                    $("#tbody").html(html);
                }else{
                    $("#car-content").show();
                    $("#show-car").hide();
                    $("#settle-accounts").hide();
                }
                
            }
            allCheck() {
                var _this=this;
                $(".allcheck").change(function () {
                    if(this.checked){
                        _this.n= $(".check").length;
                        $(".all-state").addClass("checked-state");

                        $(".check").each(function(){
                            $(this).prop("checked",true)
                        })
                        $(".choose-state").each(function(){
                            $(this).addClass("checked-state")
                        }) 
                        _this.caclchoosenum();
                    }else{
                        _this.n=0;
                        $(".all-state").removeClass("checked-state");
                        $(".check").each(function(){
                            $(this).prop("checked",false)
                        })
                        $(".choose-state").each(function(){
                            $(this).removeClass("checked-state")
                        }) 
                        _this.caclchoosenum();
                    }
                })
            }
            check() {
                var _this=this;
                $("#tbody").on("change",".check",function(){
                    if(this.checked){
                        _this.n++;
                        $(this).next().children().addClass("checked-state")
                        _this.caclchoosenum();
                    }else{
                        _this.n--;
                        $(this).next().children().removeClass("checked-state")
                        _this.caclchoosenum();
                    } 
                    if($(".check").length===_this.n){
                        $(".allcheck").prop("checked",true)
                        $(".all-state").addClass("checked-state");
                    }else{
                        $(".allcheck").prop("checked",false)
                        $(".all-state").removeClass("checked-state");
                    }
                })
            }
            // tr后面的删除操作的方法
            delete(){
              var _this=this; 
              $("#tbody").on("click",".del-btn",function(){
                    $("#ok-btn1").off('click')
                    $("#cel-btn1").off('click')
                    var tr=$(this).parent().parent().get(0);
                    var id=tr.getAttribute("data-id");
                    $(document.body).append("<div class='modal-bg'></div>");
                    // 添加一个透明的背景
                    $("#modal-center1").css("display","block");
                    // 让模态框显示
                    _this.showcenter($("#modal-center1"));
                    $("#ok-btn1").click(()=>{
                        _this.shopnum.forEach(function(item,index){
                            if(item.id==id){
                                _this.shopnum.splice(index,1)
                            }
                        })
                        $("#modal-center1").css("display","none");
                        $(".modal-bg").remove(); 
                        var nowcheck=tr.children[0].children[0];
                        if(nowcheck.checked) _this.n--;
                        // console.log(_this.n)
                        tr.remove();
                        if(_this.shopnum.length===0){
                            $("#car-content").show();
                            $("#show-car").hide();
                            $("#settle-accounts").hide();
                        }
                        localStorage.setItem("shopnum",JSON.stringify(_this.shopnum));
                        _this.caclallnum();
                        _this.caclchoosenum(); 
                   })
                   $("#cel-btn1").click(function(){
                    $("#modal-center1").css("display","none");
                    $(".modal-bg").remove(); 
                   }) 
              })
            }
            // 商品数量的增加和减少的点击事件 当数量减少到0的时候弹出一个框问是否删除此商品 点击确定就是删除  点击再想想就恢复到1个商品
            addminus(){
               var _this=this; 
               //    增加商品的按钮绑定的事件
               $("#tbody").on("click",".num-add",function(){
                    $(this).prev().html(Number($(this).prev().html())+1)
                    var id=$(this).parent().parent().parent().attr("data-id");
                    _this.shopnum.forEach(function(item){
                        if(item.id==id){
                            item.num++;
                        }
                    })
                //让cookie里面的对应的num值也随着增加
                localStorage.setItem("shopnum",JSON.stringify(_this.shopnum));
                    _this.caclallnum();
                    _this.caclchoosenum(); 
               })
            //    减少商品绑定的事件
               $("#tbody").on("click",".num-minus",function(){
                    var tr=$(this).parent().parent().parent().get(0);
                    var id=$(this).parent().parent().parent().attr("data-id");
                    $(this).next().html(Number($(this).next().html())-1);
                    _this.shopnum.forEach(function(item){
                        if(item.id==id){
                            item.num--;
                        }
                    })
                    // 判断如果减到0的时候的事件
                    if(Number($(this).next().html())===0){
                        $("#ok-btn").off('click')
                        $("#cel-btn").off('click')
                        $(document.body).append("<div class='modal-bg'></div>");
                        // 添加一个透明的背景
                        $("#modal-center").css("display","block");
                        // 让模态框显示
                        _this.showcenter($("#modal-center"));
             // 模态框的确定和再想想按钮绑定点击事件 
            // 确定按钮要做的是 关闭模态框和透明背景的div  然后删除本行
            // 再想想按钮要做的是 关闭模态框和透明背景的div 然后把数量恢复到1
                       $("#ok-btn").click(function(){                       
                            $("#modal-center").css("display","none");
                            $(".modal-bg").remove(); 
                            var nowcheck=tr.children[0].children[0];
                            if(nowcheck.checked) _this.n--;
                            console.log(_this.n)
                            _this.shopnum.forEach(function(item,index){
                                if(item.id==id){
                                    _this.shopnum.splice(index,1)
                                }
                            }) 
                            tr.remove();
                            if(_this.shopnum.length===0){
                                $("#car-content").show();
                                $("#show-car").hide();
                                $("#settle-accounts").hide();
                            }
                            localStorage.setItem("shopnum",JSON.stringify(_this.shopnum));
                            _this.caclallnum();
                            _this.caclchoosenum(); 
                       })
                       $("#cel-btn").click(()=>{
                            $("#modal-center").css("display","none");
                            $(".modal-bg").remove(); 
                            $(this).next().html(1)
                            _this.shopnum.forEach(function(item){
                                if(item.id==id){
                                    item.num=1;
                                }
                            })
                            localStorage.setItem("shopnum",JSON.stringify(_this.shopnum));
                            _this.caclallnum();
                            _this.caclchoosenum(); 
                       })  
                    }
                   else{
                    localStorage.setItem("shopnum",JSON.stringify(_this.shopnum));
                   }
                    _this.caclallnum();
                    _this.caclchoosenum(); 
                })
              
            }
            // 模态框居中显示的方法
            showcenter(obj){
                function center(){
                    var screenWidth = $(window).width();
                    var screenHeight = $(window).height();
                    var objLeft = (screenWidth - obj.width())/2 ;
                    var objTop = (screenHeight - obj.height())/2+$(window).scrollTop();
                  obj.css({left: objLeft + 'px', top: objTop + 'px'});
                }
                center();
                // 窗口改变大小的时候能一直居中
                $(window).resize(function(){
                    center();
                });
            }
            // 商品总的数量 不管选中没选中的都算在里面
            caclallnum(){
                var allnum=0;
                $(".goods-num").each(function(){
                    allnum+=Number($(this).html());
                })
                $("#allnum").html(allnum);
            }
            caclchoosenum(){
                var choosenum=0;
                var allmoney=0;
                $(".check:checked").each(function(){
                 var tr=$(this).parents();
                 var num=Number(tr[1].children[2].children[0].children[1].innerHTML);
                 var price=Number(tr[1].children[3].children[0].innerHTML);
                 choosenum+=num;
                 allmoney+=num*price;
                })
                $("#choosenum").html(choosenum);
                $("#allmoney").html(allmoney)
            }
        }
        new Car();
    })
})