
function Fade($container,opt){

	this.opts = opt || {};
	this.timer = null;//定时器句柄
	this.time = this.opts.time || 2500;//轮播切换时间
	this.auto_play = this.opts.auto_play;//默认不自动播放
	this.direct = this.opts.direct || 'right';//轮播方向(左右上下)
	this.arrow_btn_show = this.opts.arrow_btn_show;//默认不显示左右两个按钮
	this.arrow_btn_xiguan = this.opts.arrow_btn_xiguan;//默认点击左边按钮是向右移动
	this.arrow_btn_align = this.opts.arrow_btn_align;//左右按钮的对齐方式，如果没有，则用户手动控制(居中)
	this.dots_show = this.opts.dots_show;//默认不显示小图标（将来可以考虑小图标的显示位置，左，右，中）
	this.dots_num_show = this.opts.dots_num_show;//点上面的数字是否显示
	this.dot_align = this.opts.dot_align || 'left';//(小图标的对齐方式，左中右)
	this.move_pause = this.opts.move_pause;//是否鼠标滑过时暂停

	this.is_m = this.opts.is_m || false;

	this.container_width = this.opts.container_width;//容器的宽度
	this.container_height = this.opts.container_height;//容器的高度
	this.auto_fit = this.opts.auto_fit;//是否自适应//宽度100%，高度根据宽高值等比例缩放

	this.li_border_value = this.opts.li_border_value || 0;//li的border值，只支持四个边框同值

	this.show_num = 1;//一次展示图片的个数
	this.slide_num = 1;//一次滚动图片的个数
	
	this.i_now = 0;//一开始时是0，当前位置(0,1,2,3,4,5...循环变化)
	this.i_times = 0;//播放次数，每播一次效果，则加1

	this.canclick = true;//当动画运动完成时设为true，动画开始时设置为false

	this.default_src = this.opts.default_src || 'http://pic.shop.lenovo.com.cn/g1/M00/00/ED/CmBZD1ZyXoaAbHeEAAAERQXbP14680.gif';//将来可能是1象素的png图片,用于延迟加载
	
	this.test = this.opts.test;
	this.cssurl_test = 'css/fade.css';//这个url用于本地测试
	this.linkid = "lenovoplugin_fade_css_id_01";//保证唯一性

	this.$container = $container;
	this.$ul = this.$container.find('.wrap > ul');
	this.$lis = this.$ul.find('>li'); //原来的那一份,复制之前的
	
}
Fade.prototype = {
	constructor : Fade,
	auto : function(){
		if(this.auto_play){
			var _this = this;
			this.timer = setInterval(function(){
				_this.play();
			},this.time);
		}
	},
	set_dots : function(){
		if(this.dots_show){//如果要显示小图标

			this.$container.append(this.get_dots_html());
			var _this = this;
			setTimeout(function(){
				_this.set_dots_align();//设置小图标的对齐位置
				_this.set_dot_click();//设置小图标的点击事件
			},30);
		}
	},
	set_dots_align : function(){ //上下轮播的时候，小图标的位置怎样对齐有待调研
		this.$dots = this.$container.find('.dots');
		this.$dots_ul = this.$dots.find('>ul');

		var dots_width = this.$dots.width();
		var u_width = this.$dots_ul.width();
		var left = 0;//默认就是左
		if(this.dot_align=='center'){
			left = (dots_width - u_width)/2;
		}else if(this.dot_align=='right'){
			left = dots_width - u_width;
		}

		this.$dots_ul.css("left",left);
		this.$dots_ul.show();
	},
	get_dots_html : function(){
		var html = '<div class="dots"><ul class="clear_rx hid_rx">';
		for(var i = 0, j = this.group_length;i < j;i++){
			if(i == 0){
				html += '<li class="active">'+(this.dots_num_show==1?(i+1):"")+'</li>';
			}else{
				html += '<li>'+(this.dots_num_show==1?(i+1):"")+'</li>';
			}
			
		}
		html += '</ul></div>';
		return html;
	},
	move_dots : function(){
		if(this.dots_show){
			this.$dot_lis = this.$dots.find('li');
			this.$dot_lis.removeClass('active').eq(this.i_now).addClass('active');
		}
	},
	set_dot_click : function(){
		var _this = this;
		this.$dots_ul.delegate('>li',{
			'click' : function(index){
				var target_index = _this.$dots_ul.find('>li').index($(this));
				_this.play(target_index);
			},
			'mouseenter' : function(index){
				var target_index = _this.$dots_ul.find('>li').index($(this));
				_this.play(target_index);
			}
		});
	},

	set_mouse_inout : function(){
		var _this = this;
		if(!this.move_pause){
			return;//默认情况下如果不设置，则没有暂停效果
		}
		this.$container.mouseenter(function(){
			_this.pause();
		});
		this.$container.mouseleave(function(){
			_this.auto();
		});
	},

	pause : function(){
		clearInterval(this.timer);
		this.timer = null;
	},

	init : function(){
		try{
			this.cssurl = "http://m1.lefile.cn/comp" + '/plugin/lunbo/css/fade.css';
		}catch(e){
			console.log('测试环境下$GRUNTCONFIG是不支持的');
		}
		
		
		this.loadcss();//引入相关CSS文件

		this.group_length = Math.ceil(this.$lis.length / this.slide_num);//得到一共有多少组图片,这个属性很重要
		
		this.copylis();//先要设置一下li

		this.set_w_h();//设置宽高

		this.to_center();//将初始位置设置为中间一份的起点

		this.auto();

		this.set_dots();//设置小图标
		
		this.set_mouse_inout();//设置鼠标滑过时的效果

		this.set_arrow_btn();//设置左右按钮

		this.add_event();
	},

	start : function(){
		this.init();
	},
	loadcss : function(){
		var url = this.test ? this.cssurl_test : this.cssurl;
		var csslink = $('<link rel="stylesheet" href="'+ url +'?ss='+new Date().getTime()+'" id="'+this.linkid+'">');
		if($('#'+this.linkid).length==0){
			$(document).find('head:eq(0)').append(csslink);
		}
	},

	copylis : function(){ //共三份，初始显示中间那份，这样便于左右控制
		//this.$ul.append(this.$lis.clone()).append(this.$lis.clone()); //淡入淡出不用这一步骤
	},

	set_w_h : function(){
		//思路，舞台的宽高必须设置，li的宽是根据舞台的宽与show_num计算出来，li高度与舞台高度一致

		if(this.auto_fit){//怎样自适应，只有图片情况下
			var old_width = this.container_width;
			var old_height = this.container_height;
			this.container_width = this.$container.width();
			this.container_height = this.container_width * old_height / old_width;
			this.$ul.find('>li img').css({width : this.container_width, height : this.container_height});
		}

		if(this.container_width && this.container_height ){

			this.container_width_extra = this.li_border_value * 2 * 1;//宽度方面的额外长度
			this.container_height_extra = this.li_border_value * 2 * 1;//高度方面的额外长度


			if(!this.auto_fit){
				this.$container.css({width : this.container_width + this.container_width_extra , height : this.container_height + this.container_height_extra});
			}
			this.$container.find('.wrap').css({width : this.container_width + this.container_width_extra , height : this.container_height + this.container_height_extra });

			this.$ul.find('>li').css({width : this.container_width, height : this.container_height});

		}else{
			alert('容器的宽高参数[container_width,container_height]必须设置!');
		}
	},
	add_event : function(){

		var _this = this;

		if(this.auto_fit){
			$(window).resize(function(){

				if(this.set_w_h_timer){
					clearTimeout(this.set_w_h_timer);
					this.set_w_h_timer = null;
				}

				this.set_w_h_timer = setTimeout(function(){

					_this.set_w_h();
					_this.set_dots();//设置小图标
					_this.set_arrow_btn_align();//设置左右按钮的对齐方式

				},40)

			});
		}

			
	},
	to_center : function(){
		//淡入淡出省略
	},

	play : function(target_index){
		this.set_index(target_index);
		this.xiaoguo_prcess(target_index);
	},

	set_index : function(target_index){

		if(this.direct=='right'){
			this.i_times++;
		}else{
			this.i_times--;
		}
		if(target_index!=undefined){
			this.prev = this.i_now;   //这个prev有可能不是这样设置，暂时先这样...
			this.i_now = target_index;
			this.i_times = target_index;
		}else{
			this.i_now = this.i_times % this.group_length;
			if(this.direct=='right'){
				this.prev = this.i_now - 1;
			}else{
				this.prev = this.i_now - 0 + 1;
			}
		}
			
	},

	//target_index:目标索引，对于小图标来说就是被点击的小图标的索引，对于左右按钮来说，可以根据方向推断出目标索引
	//还有一个当前索引，就是this.i_now
	xiaoguo_prcess : function(target_index){

		if(this.show_num < this.slide_num){
			alert('一次能展示图片的个数不应小于一次滑动图片的个数');
			return;
		}

		if(!this.canclick){
			return;
		}
		
		this.canclick = false;

		this.check_is_out();

		var _this = this;
		this.$lis.eq(this.prev).fadeOut('slow');
		this.$lis.eq(this.i_now).fadeIn('slow',function(){
			_this.after_once_move(target_index);
		});

	},
	after_once_move : function(target_index){
		if(target_index!=undefined){
			this.i_now = target_index;
			this.i_times = target_index;
		}
		this.move_dots();//让小图标移动起来
		this.canclick = true;//运动完才能执行下次运动
		this.check_is_out();

		this.lazy_load();

		if(this.opts.complete){
			try{
				this.opts.complete(this);
			}catch(e){
				console.log('回调参数应该是一个函数');
			}
			
		}
		if(this.is_m){//如果是手机端
			this.pause();
			var _this = this;
			clearTimeout(this.timer_m);
			this.timer_m = setTimeout(function(){
				_this.play();
			},this.time)
			
		}
	},

	check_is_out : function(){  //检查是否越界

	},

	get_arrow_btns : function(){
		return '<div class="lunbo_arrow_btn lunbo_left_btn hid_rx"></div><div class="lunbo_arrow_btn lunbo_right_btn hid_rx"></div>';
	},

	set_arrow_btn_align : function(){
		this.$container.append(this.get_arrow_btns());
		if(this.arrow_btn_align == 'center'){//垂直居中
			var _this = this;
			setTimeout(function(){
				var left_height = _this.$container.find('.lunbo_left_btn').height();
				var right_height = _this.$container.find('.lunbo_right_btn').height();
				var container_height = _this.$container.find('.wrap').height();
				var left_top = ( container_height - left_height ) / 2;
				var right_top = ( container_height - right_height ) / 2;
				_this.$container.find('.lunbo_left_btn').css({top:left_top,left:0});
				_this.$container.find('.lunbo_right_btn').css({top:right_top,right:0});
			},30);
		}
		this.mouse_arrow_btn();
	},

	mouse_arrow_btn : function(){

		this.$container.mouseenter(function(){
			$(this).find('.lunbo_left_btn,.lunbo_right_btn').fadeIn('slow');
		});
		this.$container.mouseleave(function(){
			$(this).find('.lunbo_left_btn,.lunbo_right_btn').fadeOut('slow');
		});
	},

	set_arrow_btn : function(){
		var _this = this;
		if(this.arrow_btn_show){
			this.set_arrow_btn_align();
			this.$container.find('.lunbo_left_btn').click(function(){
				if(!_this.arrow_btn_xiguan){
					var target_index = _this.i_now - 1;
					if( target_index < 0 ){
						target_index += _this.group_length;
					}
					_this.play( target_index );
				}else{
					var target_index = _this.i_now + 1;
					if( target_index > _this.group_length - 1 ){
						target_index -= _this.group_length;
					}
					_this.play( target_index );
				}
				
			});

			this.$container.find('.lunbo_right_btn').click(function(){
				if(!_this.arrow_btn_xiguan){
					var target_index = _this.i_now + 1;
					if( target_index > _this.group_length - 1 ){
						target_index -= _this.group_length;
					}
					_this.play( target_index );
				}else{
					var target_index = _this.i_now - 1;
					if( target_index < 0 ){
						target_index += _this.group_length;
					}
					_this.play( target_index );
				}
			});

		}
	},

	lazy_load : function(){
		var $li_img_now = this.$lis.eq(this.i_now).find('img');
		var src = $li_img_now.attr('src');

		if(src == this.default_src){
			var _src = $li_img_now.attr('_src');
			$li_img_now.attr('src',_src);
		}
	}
	
}





function Slide($container,opt){

	this.opts = opt || {};
	this.timer = null;//定时器句柄
	this.time = this.opts.time || 2500;//轮播切换时间
	this.auto_play = this.opts.auto_play;//默认不自动播放
	this.direct = this.opts.direct || 'right';//轮播方向(左右上下)
	this.arrow_btn_show = this.opts.arrow_btn_show;//默认不显示左右两个按钮
	this.arrow_btn_mouse_in_out = this.opts.arrow_btn_mouse_in_out;//鼠标移入显示，移出隐藏
	this.arrow_btn_xiguan = this.opts.arrow_btn_xiguan;//默认点击左边按钮是向右移动
	this.arrow_btn_align = this.opts.arrow_btn_align;//左右按钮的对齐方式，如果没有，则用户手动控制(居中)
	this.dots_show = this.opts.dots_show;//默认不显示小图标（将来可以考虑小图标的显示位置，左，右，中）
	this.dots_num_show = this.opts.dots_num_show;//点上面的数字是否显示
	this.dot_align = this.opts.dot_align || 'left';//(小图标的对齐方式，左中右)
	this.move_pause = this.opts.move_pause;//是否鼠标滑过时暂停

	this.container_width = this.opts.container_width;//容器的宽度
	this.container_height = this.opts.container_height;//容器的高度

	this.li_border_value = this.opts.li_border_value || 0;//li的border值，只支持四个边框同值

	this.show_num = this.opts.show_num || 1;//一次展示图片的个数
	this.slide_num = this.opts.slide_num || 1;//一次滚动图片的个数
	
	this.i_now = 0;//一开始时是0，当前位置(0,1,2,3,4,5...循环变化)
	this.i_times = 0;//播放次数，每播一次效果，则加1

	this.canclick = true;//当动画运动完成时设为true，动画开始时设置为false

	this.default_src = this.opts.default_src || 'http://pic.shop.lenovo.com.cn/g1/M00/00/ED/CmBZD1ZyXoaAbHeEAAAERQXbP14680.gif';//将来可能是1象素的png图片,用于延迟加载
	
	this.test = this.opts.test;
	this.cssurl_test = 'css/slide.css';//这个url用于本地测试
	this.linkid = "lenovoplugin_slide_css_id_01";//保证唯一性

	this.$container = $container;
	this.$ul = this.$container.find('.wrap > ul');
	this.$lis = this.$ul.find('>li'); //原来的那一份,复制之前的
	
}
Slide.prototype = {
	constructor : Slide,
	auto : function(){
		if(this.auto_play){
			var _this = this;
			this.timer = setInterval(function(){
				_this.play();
			},this.time);
		}
	},
	set_dots : function(){
		if(this.dots_show){//如果要显示小图标

			this.$container.append(this.get_dots_html());
			var _this = this;
			setTimeout(function(){
				_this.set_dots_align();//设置小图标的对齐位置
				_this.set_dot_click();//设置小图标的点击事件
			},30);
		}
	},
	set_dots_align : function(){ //上下轮播的时候，小图标的位置怎样对齐有待调研
		this.$dots = this.$container.find('.dots');
		this.$dots_ul = this.$dots.find('>ul');

		var dots_width = this.$dots.width();
		var u_width = this.$dots_ul.width();
		var left = 0;//默认就是左
		if(this.dot_align=='center'){
			left = (dots_width - u_width)/2;
		}else if(this.dot_align=='right'){
			left = dots_width - u_width;
		}

		this.$dots_ul.css("left",left);
		this.$dots_ul.show();
	},
	get_dots_html : function(){
		var html = '<div class="dots"><ul class="clear_rx">';
		for(var i = 0, j = this.group_length;i < j;i++){
			if(i == 0){
				html += '<li class="active">'+(this.dots_num_show==1?(i+1):"")+'</li>';
			}else{
				html += '<li>'+(this.dots_num_show==1?(i+1):"")+'</li>';
			}
			
		}
		html += '</ul></div>';
		return html;
	},
	move_dots : function(){
		if(this.dots_show){
			this.$dot_lis = this.$dots.find('li');
			this.$dot_lis.removeClass('active').eq(this.i_now).addClass('active');
		}
	},
	set_dot_click : function(){
		var _this = this;
		this.$dots_ul.delegate('>li',{
			'click' : function(index){
				var target_index = _this.$dots_ul.find('>li').index($(this));
				_this.play(target_index);
			},
			'mouseenter' : function(index){
				var target_index = _this.$dots_ul.find('>li').index($(this));
				_this.play(target_index);
			}
		});
	},

	set_mouse_inout : function(){
		var _this = this;
		if(!this.move_pause){
			return;//默认情况下如果不设置，则没有暂停效果
		}
		this.$container.mouseenter(function(){
			_this.pause();
		});
		this.$container.mouseleave(function(){
			_this.auto();
		});
	},

	pause : function(){
		clearInterval(this.timer);
		this.timer = null;
	},

	init : function(){
		try{
			this.cssurl = "http://m1.lefile.cn/comp" + '/plugin/lunbo/css/slide.css';
		}catch(e){
			console.log('测试环境下$GRUNTCONFIG是不支持的');
		}
		
		
		this.loadcss();//引入相关CSS文件

		this.group_length = Math.ceil(this.$lis.length / this.slide_num);//得到一共有多少组图片,这个属性很重要
		
		this.copylis();//先要设置一下li

		this.set_w_h();//设置宽高

		this.to_center();//将初始位置设置为中间一份的起点

		this.auto();

		this.set_dots();//设置小图标
		
		this.set_mouse_inout();//设置鼠标滑过时的效果

		this.set_arrow_btn();//设置左右按钮
	},

	start : function(){
		this.init();
	},
	loadcss : function(){
		var url = this.test ? this.cssurl_test : this.cssurl;
		var csslink = $('<link rel="stylesheet" href="'+ url +'?ss='+new Date().getTime()+'" id="'+this.linkid+'">');
		if($('#'+this.linkid).length==0){
			$(document).find('head:eq(0)').append(csslink);
		}
	},

	copylis : function(){ //共三份，初始显示中间那份，这样便于左右控制
		this.$ul.append(this.$lis.clone()).append(this.$lis.clone());
	},

	set_w_h : function(){
		//思路，舞台的宽高必须设置，li的宽是根据舞台的宽与show_num计算出来，li高度与舞台高度一致
		if(this.container_width && this.container_height ){
			var li_num = this.$ul.find('li').length; //这时候已经是原来的3倍了

			if( this.direct == 'left' || this.direct == 'right' ){ //左右轮播

				this.li_width = this.container_width / this.show_num; //一个li的宽度
				var ul_width = this.li_width * li_num;
				this.$ul.css({width : ul_width, height : this.container_height});
				this.$ul.find('>li').css({width : this.li_width, height : this.container_height});

				this.container_width_extra = this.li_border_value * 2 * this.show_num;//宽度方面的额外长度
				this.container_height_extra = this.li_border_value * 2 * 1;//高度方面的额外长度

			}else{ //上下轮播

				this.li_height = this.container_height / this.show_num;//一个li的高度
				var ul_height = this.li_height * li_num;
				this.$ul.css({width : this.container_width, height : ul_height});
				this.$ul.find('>li').css({width : this.container_width, height : this.li_height});

				this.container_width_extra = this.li_border_value * 2 * 1;//宽度方面的额外长度
				this.container_height_extra = this.li_border_value * 2 * this.show_num;//高度方面的额外长度

			}

			this.$container.css({width : this.container_width + this.container_width_extra , height : this.container_height + this.container_height_extra});
			this.$container.find('.wrap').css({width : this.container_width + this.container_width_extra, height : this.container_height + this.container_height_extra});

				

		}else{
			alert('容器的宽高参数[container_width,container_height]必须设置!');
		}
	},
	to_center : function(){
		if( this.direct == 'left' || this.direct == 'right' ){//左右轮播

			var target_left = this.$lis.length * this.li_width + this.$lis.length * this.li_border_value * 2;
			this.$ul.css({left : -target_left});

		}else{

			var target_top = this.$lis.length * this.li_height + this.$lis.length * this.li_border_value * 2;
			this.$ul.css({top : -target_top});

		}
			
	},

	play : function(target_index){
		this.set_index(target_index);
		this.xiaoguo_prcess(target_index);
	},

	set_index : function(target_index){
		if(target_index==undefined){
			if(this.direct=='right' || this.direct=='down'){
				this.i_times--;
			}else{
				this.i_times++;
			}
			this.i_now = this.i_times % this.group_length;
			if(this.i_now < 0){
				this.i_now += this.group_length;
			}
		}
			
	},

	//target_index:目标索引，对于小图标来说就是被点击的小图标的索引，对于左右按钮来说，可以根据方向推断出目标索引
	//还有一个当前索引，就是this.i_now
	xiaoguo_prcess : function(target_index){

		if(this.show_num < this.slide_num){
			alert('一次能展示图片的个数不应小于一次滑动图片的个数');
			return;
		}

		if(!this.canclick){
			return;
		}
		
		this.canclick = false;

		this.check_is_out();

		//根据方向（左右上下）及一次移动距离来进行移动
		var one_move_dis = 0;
		if(this.direct == 'right'){ //向右
			if(target_index!=undefined){
				one_move_dis -= this.slide_num * ( this.li_width + this.li_border_value * 2 );
			}else{
				one_move_dis += this.slide_num * ( this.li_width + this.li_border_value * 2 );
			}
		}else if(this.direct == 'left'){
			one_move_dis -= this.slide_num * ( this.li_width + this.li_border_value * 2 );
		}else if(this.direct == 'down'){
			if(target_index!=undefined){
				one_move_dis -= this.slide_num * ( this.li_height + this.li_border_value * 2 );
			}else{
				one_move_dis += this.slide_num * ( this.li_height + this.li_border_value * 2 );//container_height相当于img_height
			}
			
		}else{//向上
			one_move_dis -= this.slide_num * ( this.li_height + this.li_border_value * 2 );
		}

		var dis_num = target_index - this.i_now;
		if(Math.abs(dis_num) > this.group_length/2){
			if(dis_num < 0){//比如 -3 得到正2
				dis_num = this.group_length - Math.abs(dis_num);
			}else{ //正3 得到-2
				dis_num = Math.abs(dis_num) - this.group_length;//也就是说如果长度为5的话，正3的距离就相当于-2的距离
			}
		}

		if(target_index!=undefined){
			one_move_dis *= dis_num;
		}
		
		var _this = this;
		if(this.direct == 'left' || this.direct == 'right'){//左右
			this.$ul.animate({left : (this.$ul.position().left + one_move_dis)},1000,function(){
				_this.after_once_move(target_index);
			});
		}else{//上下
			this.$ul.animate({top : (this.$ul.position().top + one_move_dis)},1000,function(){
				_this.after_once_move(target_index);
			});
		}

	},
	after_once_move : function(target_index){
		if(target_index!=undefined){
			this.i_now = target_index;
			this.i_times = target_index;
		}
		this.move_dots();//让小图标移动起来
		this.canclick = true;//运动完才能执行下次运动
		this.check_is_out();

		this.lazy_load();

		if(this.opts.complete){
			try{
				this.opts.complete(this);
			}catch(e){
				console.log('回调参数应该是一个函数');
			}
			
		}
	},

	check_is_out : function(){  //检查是否越界

		if( this.direct == 'left' || this.direct == 'right' ){//左右轮播

			var left = this.$ul.position().left;
			var length = this.$lis.length * ( this.li_width + this.li_border_value * 2); //一份的长度
			if(left <= -length*2){//先判断有没有越界，越界立马回到中间位置
				this.$ul.css({left : left + length});
			}else if(left >= -length){
				this.$ul.css({left : left - length});
			}

		}else{

			var top = this.$ul.position().top;
			var length = this.$lis.length * ( this.li_height + this.li_border_value * 2); //一份的长度
			if(top <= -length*2){//先判断有没有越界，越界立马回到中间位置
				this.$ul.css({top : top + length});
			}else if(top >= -length){
				this.$ul.css({top : top - length});
			}

		}

	},

	get_arrow_btns : function(){
		return '<div class="lunbo_arrow_btn lunbo_left_btn hid_rx"></div><div class="lunbo_arrow_btn lunbo_right_btn hid_rx"></div>';
	},

	set_arrow_btn_align : function(){
		this.$container.append(this.get_arrow_btns());
		if(this.arrow_btn_align == 'center'){//垂直居中
			var _this = this;
			setTimeout(function(){
				var left_height = _this.$container.find('.lunbo_left_btn').height();
				var right_height = _this.$container.find('.lunbo_right_btn').height();
				var container_height = _this.$container.find('.wrap').height();
				var left_top = ( container_height - left_height ) / 2;
				var right_top = ( container_height - right_height ) / 2;

				if(_this.arrow_btn_mouse_in_out){
					_this.$container.find('.lunbo_left_btn').css({top:left_top,left:0});
					_this.$container.find('.lunbo_right_btn').css({top:right_top,right:0});
					_this.mouse_arrow_btn();
				}else{
					_this.$container.find('.lunbo_left_btn').css({top:left_top,left:0}).show();
					_this.$container.find('.lunbo_right_btn').css({top:right_top,right:0}).show();
				}

				
				
			},30);
		}
		

		
	},

	mouse_arrow_btn : function(){

		this.$container.mouseenter(function(){
			$(this).find('.lunbo_left_btn,.lunbo_right_btn').fadeIn('slow');
		});
		this.$container.mouseleave(function(){
			$(this).find('.lunbo_left_btn,.lunbo_right_btn').fadeOut('slow');
		});
	},

	set_arrow_btn : function(){
		var _this = this;
		if(this.arrow_btn_show){
			this.set_arrow_btn_align();
			this.$container.find('.lunbo_left_btn').click(function(){
				if(!_this.arrow_btn_xiguan){
					var target_index = _this.i_now - 1;
					if( target_index < 0 ){
						target_index += _this.group_length;
					}
					_this.play( target_index );
				}else{
					var target_index = _this.i_now + 1;
					if( target_index > _this.group_length - 1 ){
						target_index -= _this.group_length;
					}
					_this.play( target_index );
				}
				
			});

			this.$container.find('.lunbo_right_btn').click(function(){
				if(!_this.arrow_btn_xiguan){
					var target_index = _this.i_now + 1;
					if( target_index > _this.group_length - 1 ){
						target_index -= _this.group_length;
					}
					_this.play( target_index );
				}else{
					var target_index = _this.i_now - 1;
					if( target_index < 0 ){
						target_index += _this.group_length;
					}
					_this.play( target_index );
				}
			});

		}
	},

	//回头想想，根据i_now,lis.length,group_length,direct,show_num,slide_num等，怎样判断是否可以加载
	//或者干脆就根据li的left值来判断
	lazy_load : function(){
		for(var i = 0 , j = this.show_num ; i < j ; i++){
			this.lazy_load_1_1(i);
		}
	},
	//屏一滑一
	lazy_load_1_1 : function(i){
		var $target_imgs = this.$container.find('li:nth-child('+this.$lis.length+'n+'+(this.i_now * this.slide_num+1+i)+') img');
		var _this = this;
		$target_imgs.each(function(){
			var $this = $(this);
			var src = $this.attr('src');
			if(src == _this.default_src){
				var _src = $this.attr('_src');
				$this.attr('src',_src);
			}
		});
	}
	
}



$().ready(function(){
	$('.lenovoplugin').each(function(){

		var $this = $(this);

		if($this.hasClass('lunbo_fade')){
			var optO = get_optO($this);
			new Fade($this,optO).start();
		}
		if($this.hasClass('lunbo_slide')){
			var optO = get_optO($this);
			new Slide($this,optO).start();
		}

	});
});

function get_optO($this){
	var optO = stringToJson($this.attr('optp'));
	var complete = $this.attr('complete');
	if(complete){
		optO.complete = function(o_lunbo){
			
			eval(complete+'(o_lunbo)');
		}	
	}
	return optO;
}

//前提str是一个合法的json格式的字符串
function stringToJson(str){
	if(JSON){
		try{
			return JSON.parse(str);
		}catch(e){
			alert('JSON格式不正确');
		}
	}else{
		try{
			return eval('('+str+')');
		}catch(e){
			alert('JSON格式不正确');
		}
	}
}


