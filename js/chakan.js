/**
 * Created by ³É³É on 2017/4/7.
 */
$(function(){
    $(".tu_left li").click(
        function(){
            var a=$(this).attr("title")
            $(".tu_right img").attr("src",a)
        }
    )
})