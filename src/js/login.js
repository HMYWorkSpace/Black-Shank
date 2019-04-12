require(["require.config"], function () {
    require(["jquery","header","url"],function($,header,url){
        header.init().then(function(){
            // console.log($("#header-ul"));
            $("#header-ul").remove();
            $("#header-ol").remove();
        })
        

        class Login{
            constructor(){
                this.login();
            }
            login(){
                $("#log-btn").click(function(){
                    var phonenumber=$("#phonenumber").val();
                    var password=$("#password").val();
                    if(!(/^1[34578]\d{9}$/.test(phonenumber))){
                        alert("手机号不符合规范")
                    }else{
                        $.post(url.baseUrl2+"login.php",{phonenumber,password},function(res){
                            res=JSON.parse(res);
                            // console.log(res);
                            if(res.res_code===1){
                             if(confirm(res.res_message+ ",跳转商城")){
                              location.href = "/html/shoplist.html";
                              localStorage.setItem("user",phonenumber)
                             }
                            }else{
                                alert("账号密码错误,请核对后再登");
                            }
                          })
                    }
                    return false;
                })
            }
        }
        new Login();
    })
})