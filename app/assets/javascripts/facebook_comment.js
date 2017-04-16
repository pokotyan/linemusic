$(document).on('ready pjax:end',function(){
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.8&appId=228314570969832";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});
//readyイベントの時はFB.XFBML.parse();を呼んではダメ。カルーセルが崩れる
//pjax:endのイベントで呼ぶこと。またendで呼ばないとpjaxが完了しなくなる
$(document).on('pjax:end',function(){
  FB.XFBML.parse();
});
