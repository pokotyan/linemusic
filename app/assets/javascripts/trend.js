$(document).on('ready pjax:success',function(){

  //トップページの「もっと見る」をクリックすると該当の「もっと見る」の項目を遷移先ページで選択ずみの状態にする
  $(".more").on('click', function(e) {
    var title = $(e.target).parents('.title_bar').find("h3").text();
    if( title == "NEW ALBUMS" ){
      $(document).on('ready pjax:end',function(){
        $("a[href = '#new_albums']").click();
      });
    }else if( title == "おすすめアーティスト" ){
      $(document).on('ready pjax:end',function(){
        $("a[href = '#reccomend_artists']").click();
      });
    }
  });

  //トレンドページのタイトル名の切り替え
  $(".nav-tabs a").on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    if( id === "#new_albums" ){
      $(".trend-title > h2").text("NEW ALBUMS");
    }else if( id === "#reccomend_artists" ){
      $(".trend-title > h2").text("おすすめアーティスト");
    }
  });
});
