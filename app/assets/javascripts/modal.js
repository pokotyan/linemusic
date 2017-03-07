$(function() {
  $(window).load(function() {
    if( !$(".header-user-image")[0] ){     //ログインしてなかったら
      $('#ticket_modal_trigger').click();  //チケットモーダルを表示
    }
  });
  //pjaxでログイン画面に遷移するとモーダルが開きっぱなしなので閉じる
  $(".modal_login_btn").click(function(){
    $(".modal-header > .close").click();
  });
});
