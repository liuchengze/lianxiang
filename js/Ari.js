/**
 * Created by �ɳ� on 2017/3/29.
 */
$(function(){
    $(".nav_down").hover(
        function(){
            $(".left").show()
        }
        ,
        function(){
            $(".left").hide()
        }
    );
    $(window).scroll(
        function(){
            var a=$(window).scrollTop();
            //console.log(a);
            if(a>=257 && a<=900){
                $(".main_pic").addClass("fix").css("top","0px");
            }
            if(a>=901){
                $(".main_pic").removeClass("fix").css("top","600px")
            }
            if(a<257){
                $(".main_pic").removeClass("fix").css("top","0px")
            }
        }
    );
    $(".rm_item").hover(
        function(){
            $(this).find(".p1").css("color","red")
        }
            ,
        function(){
            $(this).find(".p1").css("color","black")
        }
    );
    $(".ij").click(
        function(){
            $(this).addClass("kk")
                .siblings().removeClass("kk")
        }
    )
    $(".xx").click(
        function(){
            $(this).toggleClass("kk")
        }
    )

});