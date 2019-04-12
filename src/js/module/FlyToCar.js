define(["jquery","fly"],function($){
    return function(container,btn,num){
        container.on("click",btn,function(e){
            $('<div style="width:40px;height:40px;background:#00c03c;border-radius:50%"></div>').fly({
                start:{
                  left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                  top: e.clientY,  //开始位置（必填）
                },
                end:{
                  left: 5, //结束位置（必填）
                  top: 54,  //结束位置（必填）
                  width: 40, //结束时高度
                  height: 40, //结束时高度
                },
                autoPlay: true, //是否直接运动,默认true
                speed: 1.1, //越大越快，默认1.2
                vertex_Rtop:100, //运动轨迹最高点top值，默认20
                onEnd: function(){
                    this.destroy();
                    num.html(Number(num.html())+1);
                } //结束回调
              })
              
        })
    }
})