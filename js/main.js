$(function() {
	/*根据屏幕宽度的变化决定轮播图的图片展示*/
	function resize() {
		console.log(11)
		//获取屏幕宽度
		var windowWidth = $(window).width();
		//判断屏幕大小
		var isSmallScreen = windowWidth < 768;
		//遍历并设置每一张背景图片
		$('#main_ad > .carousel-inner >.item').each(function(i, item) {
			var $item = $(item); //item为DOM对象，要转换为jq对象
			var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			$item.css('backgroundImage', 'url("' + imgSrc + '")');
			//小图需要等比例缩放，所以要用img标签
			if(isSmallScreen) {
				$item.html('<img src="' + imgSrc + '" alt="" />');
			} else {
				//大图的时候清空img标签
				$item.empty();
			}
		})
	}
	$(window).on('resize', resize).trigger('resize');

	//初始化tooltip
	$('[data-toggle="tooltip"]').tooltip();

	/*
	 * 控制标签页的标签容器宽度
	 */
	var $ulContainer = $('.nav-tabs');
	//获取所有子元素的宽度和
	var width = 30; //原本ul上有padding-left
	//遍历子元素
	$ulContainer.children().each(function(index, element) {
		width += $(element).width();
	});
	//设置ul宽度
	//判断当前ul的宽度是否超出屏幕，如果超出，则显示滚动条。
	if(width > $(window).width()) {
		$ulContainer.css('width', width).parent().css('overflow-x', 'scroll');
	}

	//data-toggle="tab"的a点击注册事件
	var $newTitle = $('.news-title')
	$('#news .nav-pills a').on('click', function() {
		//获取当前点击的元素
		var $this = $(this);
		//获取对应的title值
		var title = $this.data('title');
		//将title设置到相应位置
		$newTitle.text(title);
	})

	//1.获取手指在轮播图上的一个滑动方向
	//获取界面上的轮播图容器
	var $carousels = $('.carousel');
	var startX;
	var endX;
	var offset = 50;
	//注册滑动事件
	$carousels.on('touchstart', function(e) {
		//手指触摸开始时记录一下手指所在的坐标的x
		startX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchmove', function(e) {
		//结束触摸一瞬间记录最后的手指所在坐标X
		endX = e.originalEvent.touches[0].clientX;
	})
	$carousels.on('touchend', function(e) {
		//获取每次运动的距离，当距离大于一定值时认为有方向变化
		var distance = Math.abs(startX - endX);
		
		if(distance > offset) {
			//2.根据获得的方向选择上一张或下一张
			//原生carousel方法实现
			$(this).carousel(startX>endX?'next':'prev');
		}
	})

})