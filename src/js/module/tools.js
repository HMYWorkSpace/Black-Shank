var tools={
	// 获取外部样式 
    getStyle : function(obj,attr){    
            if(obj.currentStyle){
                 return obj.currentStyle[attr];
             }else{
                 return getComputedStyle(obj, false)[attr];
         }    
    },

    // 获取定位的left和top值
	getBodyDis: function (obj){
		var left = 0, top = 0;
		//只要父级不是null
		while(obj.offsetParent != null){
			//加上边框的宽度和offset
			left += obj.offsetLeft + obj.clientLeft;
			top += obj.offsetTop + obj.clientTop;
			//把自己变成自己的父级（往前走一步）
			obj = obj.offsetParent;
		}
		return {
			"left": left,
			"top" : top
		};
	},

	// 获取浏览器的宽和高
	// return的是一个对象{width: 属性名 
	// 				  height: 属性名
	//                  }
	getBody:function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
   };
},
	/* 获取或者设置内联样式
	 * @param obj DOMObj 获取或者设置的对象
	 * @param attr 
	   *      1. string  获取obj的attr属性  
	   *         @return string  得到的属性值
	   *      2. object  设置内联样式
	 */
	// 判断attr是个字符串的话就获取该属性的值,如果是个对象就遍历这个对象
	css : function(obj, attr){
		if(typeof attr === "string") {
			//获取
			return this.getStyle(obj, attr);
		}else if(typeof attr === "object"){
			//设置
			for(var key in attr){
				obj.style[key] = attr[key];
			}
		}
	},
   

	// 鼠标的滚轮事件绑定
	// * @param obj DOMObj 绑定滚轮事件的对象
	// * @param fn  Function 事件处理函数

	mousewheel: function(obj,fn){
		// obj.onmousewheel是大包括Ie的大多数浏览器的的鼠标滚动事件
		// 如果后面不跟函数的话输出的值是null
		if(obj.onmousewheel!==undefined){
			obj.onmousewheel=function(e){
				e=e || event;
				// e.wheelDelta 代表当滚轮向下滑的时候会输出负数;
				// 向上滑的时候会输出正数;
				if(e.wheelDelta<0){
                    fn("down");
				}else{
					fn("up");
				}
			};
		}else{
			obj.addEventListener("DOMMouseScroll", function(e){
				// 火狐浏览器的鼠标滚轮事件
				// e.detail也是向上滚动和向下滚动的时候返回的值
				if(e.detail>0){
					fn("down");
				}else{
					fn("up");
				}
			});	
		}
	},


	// 监听事件
	//  @param obj DOMObj 监听事件的对象
	//  @param type string 事件句柄
	//  @param fn   function 事件处理函数 
	//  @param [isCapture] boolean false代表冒泡，true代表捕获 默认值是false
	on : function(obj,type,fn,isCapture){
			if(isCapture===undefined) isCapture=false;
			if(obj.attachEvent){
				obj.attachEvent("on"+type,fn);
			}else{
				obj.addEventListener(type,fn,isCapture);
			}
	},

		/* 移出监听事件
	* @param obj DOMObj 移出监听事件的对象
	* @param type string 事件句柄
	* @param fn   function 事件处理函数 
	*/
	off: function(obj, type, fn){
		if(obj.detachEvent){
			obj.detachEvent("on"+type, fn);
		}else{
			obj.removeEventListener(type, fn);
		}
	},
	
// 	让元素匀速运动
// 	* obj DOMObj 运动的DOM元素
// 	* attr string 运动的属性
// 	* end number 终点值
// 	* duration number 运动时间
    move : function(obj,attr,end,duration){
		clearInterval(obj.timer);
	    var start=parseInt(this.getStyle(obj,attr));
		// this.getStyle(obj,attr)是有px的值所以要取个整
		// 首先取到要运动元素的初始值,this代表的是tools
		var distance=end-start;
		// 然后获得要运动的距离
		var step=Math.floor(duration/30);
		// 30毫秒运动一次,要运动的总时间要走多少步
		var speed=distance/step;
		// 这个是每一步的速度
		// timer要想是唯一的就写在对象上面的属性
		obj.timer=setInterval(function(){
			start+=speed;
			if(Math.abs(end-start)<=Math.abs(speed)){
				start=end;
				clearInterval(obj.timer)
			}
			obj.style[attr]=start+"px";
		},30)

},


// 让元素在body内居中
// @param obj  DOMObj 要居中的那个元素

   showCenter:function(obj){
		obj.style.position = "absolute";
		var _this=this;
		function center(){
       var _left=(_this.getBody().width - obj.offsetWidth)/2;
			 var _top=(_this.getBody().height - obj.offsetHeight)/2;
			 obj.style.left=_left+"px";
			 obj.style.top=_top+"px";
		}
		center();
		window.onresize=center;
   },
   /* cookie的操作（存取）
    * @param key   string  存取的key值
    * @param [value] string  如果传入value，那么就是存cookie，不传就是取cookie
    * @paran [option] object  {expires, path}
    * @return  string 取cookie的时候返回的当前cookie的值
    */
   cookie : function (key, value, option) {
   	if(value === undefined){
   		// 取cookie
   		var cookie = document.cookie;
   		var arr = cookie.split("; ");
   		var obj = {};
   		arr.forEach(function(ele){
   			var subarr = ele.split("=");
   			obj[subarr[0]] = decodeURIComponent(subarr[1]);
   		})
   		// 判断
   		return obj[key] ? obj[key] : "";
   		/* if(obj[key]){
   			return obj[key];
   		}else {
   			return "";
   		} */
   		
   	}else{
   		//存
   		var str = key+"="+encodeURIComponent(value);
   		if(option){
   			// path
   			if(option.path){
   				str += ";path="+option.path;
   			}
   			if(option.expires) {
   				var date = new Date();
   				// 把过期日期设置为option.expires天之后
   				date.setDate(date.getDate() + option.expires);
   				str += ";expires=" + date;
   			}
   		}
   		
   		document.cookie = str;
   	}
   },
   /* ajax请求get
    * @param url     string   请求的路径
    * @param query   object   请求的参数query
    * @param succCb  function 请求成功之后的回调
    * @param failCb  function 请求失败的回调
    * @param isJson  boolean  true： 解析json  false：文本请求  默认值true 
    */
   ajaxGet : function (url, query, succCb, failCb, isJson) {
   	// 拼接url加query
   	if(query) {
   		url += "?";
   		for(var key in query){
   			url += key+"="+query[key]+"&";
   		}
   		// 把最后一个&删掉
   		url = url.slice(0, -1);
   	}
   	
   	// 1、创建对象
   	var ajax = new XMLHttpRequest();
   	// 2、建立连接
   	ajax.open("GET", url, true);
   	
   	// 3、发送请求
   	ajax.send(null);
   	
   	// 4、监听状态的改变
   	ajax.onreadystatechange = function(){
   		if(ajax.readyState === 4){
   			if(ajax.status === 200){
   				// 用户传了回调才执行
   				// isJson默认值为true，要解析json
   				if(isJson === undefined){
   					isJson = true;
   				}
   				var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
   				succCb && succCb(res);
   			}else{
   				// 请求失败
   				failCb && failCb();
   			}
   			
   		}
   	}
   	
   },
  /* ajax请求post
	 * @param url     string   请求的路径
	 * @param query   object   请求的参数query
	 * @param succCb  function 请求成功之后的回调
	 * @param failCb  function 请求失败的回调
	 * @param isJson  boolean  true： 解析json  false：文本请求  默认值true 
	 */
	ajaxPost: function(url, query, succCb, failCb, isJson){
		var ajax = new XMLHttpRequest();

		ajax.open("POST", url, true);
		// 设置请求头数据传输格式
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		// 把query拼接成urlencoded

		var str = "";
		for(var key in query){
			str += key + "=" + query[key] + "&";
		}
		str = str.slice(0,-1);

		ajax.send(str);

		ajax.onreadystatechange = function () {
			if(ajax.readyState === 4) {
				if(ajax.status === 200){
					// 判断isJson是否传进来了
					isJson = isJson === undefined ? true : isJson;
					succCb && succCb(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
				}
			}
		}
	},
	
	/* jsonp ajax请求
	 * @param  url  string 请求路径
	 * @param  cb    string  全局函数名
	 * @param  query  object  请求参数
	 */
	ajaxJsonp : function(url, cb, query) {
		// 1、 创建script标签
		var script  = document.createElement("script");
		// 2、拼接url和回调函数以及请求参数
		url += "?cb="+cb;
		if(query){
			for(var key in query){
				url += "&"+key+"="+query[key];
			}
		}
		
		// 3、设置script的src属性
		script.src = url;
		// 4、 把script添加到body中
		document.body.appendChild(script);
		document.body.removeChild(script);
	},
	// Promise
	ajaxGetPromise : function(url, query, isJson){
		return new Promise(function(resolve, reject) {
			// 拼接url加query
			if(query) {
				url += "?";
				for(var key in query){
					url += key+"="+query[key]+"&";
				}
				// 把最后一个&删掉
				url = url.slice(0, -1);
			}
			
			// 1、创建对象
			var ajax = new XMLHttpRequest();
			// 2、建立连接
			ajax.open("GET", url, true);
			
			// 3、发送请求
			ajax.send(null);
			
			// 4、监听状态的改变
			ajax.onreadystatechange = function(){
				if(ajax.readyState === 4){
					if(ajax.status === 200){
						// 用户传了回调才执行
						// isJson默认值为true，要解析json
						if(isJson === undefined){
							isJson = true;
						}
						var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
						resolve(res);
					}else{
						// 请求失败
						reject();
					}
					
				}
			}
		})
	}
}