require.config({
	baseUrl: "/",
	paths : {
		"jquery" : "lib/jquery/jquery-3.2.1",
		"header" : "js/module/header",
		"footer" : "js/module/footer",
		"url" : "js/module/url",
		"template" : "lib/art-template/template-web",
		"swiper" : "lib/swiper/js/swiper",
		"zoom":"lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		"bootstrap":"lib/bootstrap/js/bootstrap.min",
		"fly":"lib/jquery-plugins/jquery.fly.min",
		"FlyToCar":"js/module/FlyToCar",
	},
	// 垫片，不满足AMD规范的模块，但是又依赖于另外的模块
	shim : {
		"zoom" : {
			deps: ["jquery"]
		},
		"bootstrap":{
			deps:["jquery"]
		},
		"fly":{
			deps:["jquery"]
		},
	}
})