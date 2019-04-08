require(["require.config"], function () {
    require(["jquery","zoom"],function($){
       class Magnifier{
           constructor(){
               this.zoom();
               console.log(1)
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
       }
       new Magnifier();
    })
})