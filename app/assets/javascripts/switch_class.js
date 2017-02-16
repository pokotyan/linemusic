$(document).on('ready pjax:success',function(){
  //ヘッダーにある項目のactive切り替え
  //テーマ&ジャンル
  if( location.href.match(/genres/) ){
    $("#header-menu > ul > .active").removeClass("active");
    $('#header-menu > ul > li:nth-child(2)').addClass("active");
  //ランキング
  }else if( location.href.match(/rankings/) ){
    $("#header-menu > ul > .active").removeClass("active");
    $('#header-menu > ul > li:nth-child(3)').addClass("active");
  //マイミュージック（users#show）
  }else if( location.href.match(/users\/[0-9]+/) ){
    $("#header-menu > ul > .active").removeClass("active");
    $('#header-menu > ul > li:nth-child(4)').addClass("active");
  //検索
  }else if( location.href.match(/search/) ){
    $("#header-menu > ul > .active").removeClass("active");
  //トップ
  }else{
    $("#header-menu > ul > .active").removeClass("active");
    $('#header-menu > ul > li:nth-child(1)').addClass("active");
  }

  //マイミュージクページの.tab-paneのactiveクラスの付け替え
  $(".nav-tabs a").on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');                       //link_toの遷移先は.tab-paneのID
    $(".tab-content .active").removeClass("active");   //現在のactiveを削除
    $(id).addClass("active");                            //クリックした要素にactiveを付与
  });
});
