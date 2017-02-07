//基本ここ（http://peacepopo.net/blog-entry-238.html）のコピペだけど、arrows:trueにして矢印は有効にすること
$(document).on('ready pjax:success',function(){
  $('.myslider').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    dots: true,
    arrows: true,        //trueにしないと矢印が見えない。css側で色も変更するのを忘れずに
    centerMode: true,
    centerPadding: '15%' //この値を変えれば画像のでかさが変わる
  });
});
