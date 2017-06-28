/**
 * Created by ³É³É on 2017/4/4.
 */
$(function(){
    $(".main3 h3").click(
        function(){
            $(this).next("div").slideToggle()
            $(this).find("span").toggleClass("shang")
        }
    )
})