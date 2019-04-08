require(["require.config"], function () {
    require(["jquery","header"],function($,header){
        header.init().then(function(){
            // console.log($("#header-ul"));
            $("#header-ul").remove();
            $("#header-ol").remove();
        })
    })
})