define(["jquery"],function($){
        class Footer{
            constructor(){
                this.init();
            }
            init(){
                $("#footer-content").load("/html/module/footer.html");
            }
        }
    return new Footer();
})