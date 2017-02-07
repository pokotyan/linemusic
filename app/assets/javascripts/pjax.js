$(function() {
  //pjaxのタイムアウトを無効にする。これで常にpjaxでページ遷移できる。
  //参考：http://stackoverflow.com/questions/10467412/pjax-working-on-select-pages-only
  $.pjax.defaults.timeout = false;

  // data-remote、data-behavior、data-skip-pjaxのデータ属性ではないaタグをクリックしたら
  // data-pjax-containerの中身（application.html.hamlのyeild）をpjaxで変更
  $(document).pjax('a:not([data-remote]):not([data-behavior]):not([data-skip-pjax])', '[data-pjax-container]');
});
