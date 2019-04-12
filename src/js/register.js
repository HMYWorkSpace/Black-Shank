require(["require.config"], function () {
    require(["jquery","header","url"],function($,header,url){
        header.init().then(function(){
            // console.log($("#header-ul"));
            $("#header-ul").remove();
            $("#header-ol").remove();


            class Register{
                constructor(){
                    this.request();
                }
                // 点击注册按钮的时候请求register.php 判断有的话就返回已有账号  如果没有此账号就存进去
                request(){
                    var _this=this;
                    // 判断是否勾选了我已阅读了协议
                    $("#btn").change(function(){
                        if(this.checked){
                            $("#reg-btn").attr("disabled",false);
                        }else{
                            $("#reg-btn").attr("disabled",true);
                        }
                    })
                    // 获取4位的验证码
                    $("#get-vcode").click(function(){
                        _this.getcode(this)
                        return false;
                      })
                    //   注册按钮的点击事件
                    $("#reg-btn").click(function(){
                        var phonenumber=$("#phonenumber").val();
                        var password=$("#password").val();
                        var confirmpass=$("#confirm").val();
                        var inputcode=$("#input-code").val();
                        var getcode=$("#get-vcode").html();
                        // console.log(phonenumber,password)
                        // console.log(inputcode)
                        // console.log(getcode)
                        if(!(/^1[34578]\d{9}$/.test(phonenumber))){
                            alert("手机号有误");
                        }else{
                            if(password!=confirmpass){
                                alert("密码不一样")
                            }else if(inputcode!=getcode){
                                alert("验证码输入错误")
                            }else{
                                $.post(url.baseUrl2+"register.php",{phonenumber,password},function(res){
                                  res=JSON.parse(res);
                                  if(res.res_code===1){
                                   if( confirm(res.res_message+ ",即将登录")){
                                    location.href = "/html/login.html";
                                   }
                                    }
                                })
                            }
                        }
                        return false;
                    })
                }
                // 获取验证码的方法
                getcode(obj){
                        var code = "";   
                        var codeLength = 4;//验证码的长度  
                        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
                        'S','T','U','V','W','X','Y','Z');//随机数  
                        for(var i = 0; i < codeLength; i++) {//循环操作  
                           var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
                           code += random[index];//根据索引取得随机数加到code上  
                       }    
                       obj.innerHTML=code;
                   }
            }
            new Register();
        })
    })
})