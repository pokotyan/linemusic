$(function() {
  $(window).load(function() {
    $('#ticket_modal_trigger').click();
  });
  //pjaxでログイン画面に遷移するとモーダルが開きっぱなしなので閉じる
  $(".modal_login_btn").click(function(){
    $(".modal-header > .close").click();
  });
});
