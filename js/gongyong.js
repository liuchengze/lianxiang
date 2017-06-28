/**
 * Created by ³É³É on 2017/3/28.
 */
$(function(){
    $(".top_inner_left li").hover(
        function(){
            $(this).children("ul,div").show()
        },
        function(){
            $(this).children("ul,div").hide()
        }
    );
    $(".left .left_f>li").hover(
        function(){
            $(this).children("div").show()
        }
        ,
        function(){
            $(this).children("div").hide()
        }
    );
    $(".footer li a").hover(
        function(){
            $(this).css("color","black")
        }
        ,
        function(){
            $(this).css("color","#555")
        }

    )

});