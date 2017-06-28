/**
 * Created by ³É³É on 2017/3/20.
 */
$(function(){

    $(".center").kxbdSuperMarquee({
        distance:770,
        time:2,
        direction: 'left',
        navId:'#shuzi',
    });
    $(".banner_inner").hover(
        function(){
            $(".btn_left,.btn_right").show()
        },
        function(){
            $(".btn_left,.btn_right").hide()
        }
    );
    $(".btn_left").click(
        function(){
           var a=$(".sjy li:last").remove();
            $(".sjy ul").prepend(a);
            $(".sjy ul").css("margin-left","-252px");
            $(".sjy ul").animate({"margin-left":0});
            return false;
        }
    );
    $(".btn_right").click(
        function(){
            $(".sjy ul").animate({"margin-left":"-225px"},
            function(){
                var b=$(".sjy li:first").remove();
                $(".sjy ul").append(b);
                $(".sjy ul").css("margin-left","0px");
            }
            );
            return false;
        }
    );
$(".boo").hover(
    function(){
        $(this).find("img").animate({"margin-left":"15px"})
    }
    ,
    function(){
        $(this).find("img").animate({"margin-left":"0"})
    }
)

});
