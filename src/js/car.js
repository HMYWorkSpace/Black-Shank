require(["require.config"], function () {
    require(["jquery", "header", "footer"], function ($, header, footer) {
        header.init();
        class Car {
            constructor() {
                this.allCheck();
                this.drawcookie();
            }
            allCheck() {
                $(".allcheck").on("change", function () {
                    this.checked ?
                        $(".all-state").addClass("checked-state") :
                        $(".all-state").removeClass("checked-state");
                })
            }
            check() {
                var span = $(".choose-state");
                var input = $(".check");
                console.log(span);
                console.log(input);
                input.each(function (i) {
                    $(this).change(function () {
                        console.log(i);
                        this.checked ?
                            span[i].classList.add("checked-state") :
                            span[i].classList.remove("checked-state");
                    })
                })
            }
            // 提取cookie  然后把数据渲染到表格里面
            drawcookie() {
                var shopnum = JSON.parse(localStorage.getItem("shopnum"));
                console.log(shopnum);
                var html="";
                shopnum.forEach(function (item,index) {
                    html += `
                        <tr>
                            <td>
                                <input type="checkbox" class="check" id="check-${index}">
                                <label for="check-${index}">
                                    <span class="choose-state"></span>
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
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </td>
                        </tr>
                        `;
                })
                $("#tbody").html(html);
                this.check();
                this.addminus();
            }
            // 商品数量的增加和减少的点击事件 当数量减少到0的时候弹出一个框问是否删除此商品 点击确定就是删除  点击再想想就恢复到1个商品
            addminus(){
               var add=$(".num-add");
               var minus=$(".num-minus");
               var goodsnum=$(".goods-num");
               add.each(function(i){
                   $(this).on("click",()=>{
                       var num=Number(goodsnum[i].innerHTML);
                       num++;
                       $(this).prev().html(num);
                   })
               })
               minus.each(function(i){
                $(this).on("click",()=>{
                    var num=Number(goodsnum[i].innerHTML);
                    num--;
                    // 判断如果减到0的时候的事件
                    if(num===0){
                        $(document.body).append("<div class='modal-bg'></div>");
                        // 添加一个透明的背景
                        $("#modal-center").css("display","block");
                        // 让模态框显示
                        var obj=$("#modal-center");
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
                    }
                    $(this).next().html(num);
                })
            })
            }
        }
        new Car();
    })
})