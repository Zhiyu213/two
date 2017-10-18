// 加载完毕事件 在该事件中 写的js代码 去获取dom元素 就一定不会出现找不到的问题
window.onload = function () {
	// 顶部的通栏 滚动的效果
	headerScroll();

	// 倒计时的效果
	cutDownTime();

	// 轮播图的效果
	scrollPic();
}

// 通栏方法
/*
	获取 导航栏的 高度

	在onscroll 事件中 去修改颜色
		0-1的透明度
		获取到 滚动的距离
		滚动的距离 /导航栏  0-1的浮点数
		滚动的距离 大于导航栏 >1  如果透明度 >1 变为1

		通过js  修改 顶部通栏的 透明度即可
			为了保证 子元素 能够正常显示 rgba()  hsla();

*/
function headerScroll() {
	
	//1. 获取一些 必须要知道的 参数
	/*
		导航栏的高度
		顶部的通栏 (为了在 onscroll 事件中 使用 避免 一只获取 造成的 性能浪费(很小))
	*/
	// 距离 顶部的 高度
	// console.log('offsetTop:'+document.querySelector('.jd_nav').offsetTop);
	// 元素自身的 高度
	// console.log('offsetHeight:'+document.querySelector('.jd_nav').offsetHeight);

	// 获取 导航栏
	var navDom = document.querySelector('.jd_nav');

	//  希望获取的是 从顶部 到 导航栏 底部的 距离
	var maxDistance = navDom.offsetTop + navDom.offsetHeight;

	// 获取 顶部的通栏
	var headerDom = document.querySelector('.jd_header');

	// 0 为了保证默认是透明度 可以再这里 直接设置 rgba的a 为0
	// 使用js 修改的样式 会变为 行内式
	headerDom.style.backgroundColor = 'rgba(201,21,35,0)';


	// 2.注册 onscroll 事件 注册给谁
	/*
		
	*/
	window.onscroll = function () {
		// console.log('123');
		//  获取 滚动的距离 body 是通过 document 点出来的
		var scrollDistance = window.document.body.scrollTop;
		// console.log(scrollDistance);

		// 计算一个 0-1的百分数
		var percent = scrollDistance / maxDistance;
		console.log(percent);

		// 如果 超过了1 没有意义了 所以 还原为1
		if (percent>1) {
			percent=1;
		}

		// 到这 获取到的 一定是 0-1
		// 设置 顶部通栏的透明度
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';

	}


}


// 倒计时方法
/*
	定义一个 倒计时的 总时间
	获取 想要修改的 li标签

	开启定时器
		判断 是否时间没有了
		递减时间
		修改 对应标签的显示
*/
function cutDownTime() {
	// 定义 总时间 写时间时 建议 这样写
	var totalHour = 3 ;

	// 转化为秒
	var totalSec = 3*60*60;

	// 加多一秒 让用户看到的时候 是从整数 开始
	// totalSec++;
	// var totalSec = 5;

	// 获取 想要修改的所有li标签
	// querySelectorAll  querySelector 这两个方法 可以传入 css,css3 中的选择器
	// 如果想要自己封装一个 类似于jq的东西 可以再内部 调用 这两个方法
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	// console.log(liArr);

	// 开启 定时器
	// 有了 定时器id 以后 就能够 干掉该id 对应的 定时器
	var timeId = setInterval(function () {

		// 0 判断 是否 小于0了
		if (totalSec<=0) {
			// 干掉 定时器
			clearInterval(timeId);

			console.log('结束啦,你买不到了哦');

			return;
		}

		// 1递减
		totalSec--;

		// 当前的秒 对应到 多少小时 多少分 多少秒
		/*
			3671
			1小时
			1分
			11秒
			/ 除法
			% 取余 
		*/
		var hour = Math.floor(totalSec / 3600);
		var minute = Math.floor(totalSec % 3600 /60);
		var sec =totalSec % 60;


		// 2修改dom元素显示

		// 小时
		liArr[0].innerHTML =Math.floor(hour/10) ;  // 十位 41 / 10  =4.1 所以要取整数
		liArr[1].innerHTML =hour%10 ; // 个位

		// 分
		liArr[3].innerHTML = Math.floor(minute/10);// 是为 55/10 = 5.5 取整
		liArr[4].innerHTML = minute%10;

		// 秒
		liArr[6].innerHTML = Math.floor(sec/10); 
		liArr[7].innerHTML = sec%10; 



	},1000)
}



function scrollPic() {
	var wrap = document.querySelector(".jd_banner");
	//console.log(wrap)
	var list = document.querySelector(".banner_images");
 
	list.innerHTML += list.innerHTML;

	var lis = document.querySelectorAll(".banner_images li");

	var css = document.createElement('style');

	var nav = document.querySelectorAll(".banner_index span");

	var style = "#wrap{height:"+ lis[0].offsetHeight+"px}";

	var timer = 0;

	style+="#picList{width:"+lis.length+"00%}";

	style+="#picList li{width:"+(1/lis.length*100)+"%}"

	css.innerHTML+= style;

	document.head.appendChild(css);

	var startPoint = 0;

	var startX = 0;

	var now = 0;

	var isMove = true;

	var isFirst = true;

	cssTransform(list,"translateX",0);
	auto();
	wrap.addEventListener(
		"touchstart",
		function(e) {
			clearInterval(timer);
			list.style.transition = "none";
			var translateX = cssTransform(list,"translateX");
			now = Math.round(-translateX / wrap.offsetWidth);
			if(now == 0) {
				now = nav.length;
			}
			if(now == lis.length-1) {
				now = nav.length-1;
			}
			cssTransform(list,"translateX",-now * wrap.offsetWidth);
			startPoint = e.changedTouches[0];
			startX = cssTransform(list,"translateX");
			isMove = true;
			isFirst = true;
		}
	);
	wrap.addEventListener(
		"touchmove",
		function(e) {
			if(!isMove) {
				return;
			}
			var nowPoint = e.changedTouches[0];
			var disX = nowPoint.pageX - startPoint.pageX;
			var disY = nowPoint.pageY - startPoint.pageY;
			if(isFirst) {
				isFirst = false;
				if(Math.abs(disY) > Math.abs(disX)) {
					isMove = false;
				}
			}
			if(isMove) {
				cssTransform(list,"translateX",startX + disX);
			}
		}
	);
	wrap.addEventListener(
		"touchend",
		function(e) {
			var translateX = cssTransform(list,"translateX");
			now = Math.round(-translateX / wrap.offsetWidth);
			tab();
			auto();
		}
	);
	function auto() {
		clearInterval(timer);
		timer = setInterval(
			function() {
				if(now == lis.length-1) {
					now = nav.length-1;
				}
				list.style.transition = "none";
				cssTransform(list,"translateX",-now * wrap.offsetWidth);
				setTimeout(
					function () {
						now++;
						tab();	
					},30
				);
			},2000
		);
	}
	function tab() {
		list.style.transition = ".5s";
		cssTransform(list,"translateX",-now * wrap.offsetWidth);
		for(var i = 0 ; i < nav.length; i++) {
			nav[i].className = "";
		}
		nav[now%nav.length].className = "current";
		
	}
}


function cssTransform(el,attr,val) {
	if(!el.transform){
		el.transform = {};
	}
	if(arguments.length>2) {
		el.transform[attr] = val;
		var sVal = "";
		for(var s in el.transform){
			switch(s) {
				case "rotate":
				case "skewX":
				case "skewY":
					sVal +=s+"("+el.transform[s]+"deg) ";
					break;
				case "translateX":
				case "translateY":
					sVal +=s+"("+el.transform[s]+"px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scale":
					sVal +=s+"("+el.transform[s]+") ";
					break;	
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val  = el.transform[attr];
		if(typeof val == "undefined" ) {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
}