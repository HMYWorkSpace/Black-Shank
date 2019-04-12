define(["jquery"],function($){
    class Header {
        constructor(){
            
        }
        init(){
            return new Promise((resolve, reject) => {
				// 可以在加载路径后面写上空格加选择器，只加载一部分html
				$("#header-content").load("/html/module/header.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
                    resolve();
                    this.usermessage();
                });
               
			})
        }
        usermessage(){
            $("#user").mouseenter(function(){
                $("#login-status").show();
            })
            $("#user").mouseleave(function(){
                    $("#login-status").hide();
            })
            $("#login-status").mouseenter(function(){
                $(this).show();
            })
            $("#login-status").mouseleave(function(){
                $(this).hide();
            })
            var user=localStorage.getItem("user");
            if(user){
                $("#usermessage").html(localStorage.getItem("user"));
                $("#welcome").show();
            }else{
                $("#welcome").hide();
            }
            console.log(user);
            $("#usermessage").html(localStorage.getItem("user"));
            $("#esc-login").click(function(){
                localStorage.removeItem("user");
                $("#welcome").hide();
                $("#login-status").hide();
            })
        }
    }
    return new Header();
})

