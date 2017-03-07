$(document).on('ready pjax:complete',function(){
  if($("header-user-image")[0]){               //ログインしてたら実行(未ログイン時に実行するとjsがバグる)

    drawer_start();

    $(".drawer-trigger").on('click', function() {  //１曲目を選択したら
      open();                                      //ドロワー開く
      $(this).toggleClass('selected');             //選択した曲をわかりやすくするためにcheck.svgに色をつける
    });

    $('.drawer').on('drawer.opened', function(){   //ドロワー開いたら
      $('.drawer').drawer('destroy');              //他の曲も選択できるようにドロワーを開きっぱなしにするため、ドロワーを殺す
                                                   //（一度開いたら閉じれるのはドロワーメニュー内のバツボタンのみ）
      $("body").css('overflow', "auto");           //オーバーレイ側（コンテンツ側）をスクロールできるようにする
    });

    $("#drawer-close").on('click', function() {    //ドロワーメニューのバツボタンクリックしたら
      close();                                     //ドロワーメニューを閉じる
      drawer_start();                              //１曲目選択時に殺していたドロワーを復活させる（同一ページでドロワーを再び開けるようにするため）
    });
  }
});

$(document).on('pjax:complete',function(){         //ドロワー開いた状態で別のページに移動したらドロワー閉じる
  if($("header-user-image")[0]){               //ログインしてたら実行
      if ( $("body").hasClass("drawer-open") ){
        $("body").removeClass("drawer-open");
        $("body").addClass("drawer-close");
      }
  }
});

function open(){
    $("body").removeClass("drawer-close");
    $("body").addClass("drawer-open");
}

function close(){
    $("body").removeClass("drawer-open");
    $("body").addClass("drawer-close");
}

function drawer_start(){
  $(".drawer").drawer();
  my_setteing();
}
function my_setteing(){
  $(".drawer-overlay").remove();                 //オーバーレイはいらない。ドロワーメニューを表示した状態でも曲を選択できるようにする必要がある
  $(".drawer-nav").css('z-index', 9999);         //ドロワーメニューは全てのコンテンツの前面に表示
}
