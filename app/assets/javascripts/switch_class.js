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
  //トップ
  }else{
    $("#header-menu > ul > .active").removeClass("active");
    $('#header-menu > ul > li:nth-child(1)').addClass("active");
  }
});
