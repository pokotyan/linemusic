//秒を分秒へ変換
function to_ms(s){
  m=""+(s%3600/600|0)+(s%3600/60%10|0)
  s=""+(s%60/10|0)+(s%60%10)
  return m+":"+s;
};
$(document).on('ready pjax:success',function(){
  var audio = document.getElementById('song');
  audio.volume = 0.1;                                    //ボリュームの初期値（0.0 〜 1.0）

  //loadedmetadataが発火してからduration（曲長）を取得すること。
  //そうしないとdurationがNaNになり、以降の計算もできなくなり結果、プログレスバーが動かなくなる。
  audio.addEventListener('loadedmetadata', function() {  //loadedmetadata 曲の長さを判定した場合に発生。曲を読み込むたびに発生する。
  var total = Math.round(audio.duration);                //曲長（秒）
    $("#duration").text(to_ms(total));                   //曲長（分秒）を#durationのテキストに入れる
    audio.addEventListener("timeupdate", function() {    //現在の再生位置が変更された時(曲が再生されてるとき)
      //プログレスバーの表示更新処理
      var current = Math.round(audio.currentTime);       //現在の再生位置（秒）
      $("#current_time").text(to_ms(current));           //現在の再生位置（分秒）を#current_timeのテキストに入れる
      var percent = (current / total * 100) + '%';       //現在の再生位置（%）
      $('.progress-bar').css({'width':percent});         //現在の再生位置（%）をプログレスバーのwidthに入れてプログレスバーを進める

      //曲のシーク処理
      $(".progress").on("click",function(e){
        $('.progress').off('click');
        $(".progress").on("click",function(e){           //プログレスバーがクリックされたら
          var click_time = total * (e.offsetX/400);      //クリックされた位置の曲の時間を計算し、click_timeに代入(400は.progressのwidth)
          audio.currentTime = click_time;                //click_timeを現在の再生時間に代入
        });
      });
    }, false);
  });

  //再生ボタン、一時停止ボタンの表示切り替え
  audio.addEventListener('loadedmetadata', function() {  //曲を読み込むたびに(読み込むイコール再生したら)
    $(".play").addClass("blind");                        //ボタンの表示は一時停止にする
    $(".pause").removeClass("blind");
  });
  audio.addEventListener("play", function() {            //曲が再生中に
    $(".player_button").click(function(){                //プレイヤーのボタン（一時停止ボタン）押したら
      $(".play").removeClass("blind");                   //ボタン表示は「再生ボタン」にする
      $(".pause").addClass("blind");
      audio.pause();                                     //曲を一時停止
    });
  });
  audio.addEventListener("pause", function() {           //曲が一時停止中に
    $(".player_button").click(function(){                //プレイヤーのボタン（再生ボタン）押したら
      $(".play").addClass("blind");                      //ボタン表示は「一時停止ボタン」にする
      $(".pause").removeClass("blind");
      audio.play();                                      //曲を再開
    });
  });

  //音量の上げ下げ
  $(".glyphicon-menu-up").on("click",function(){
    $(".glyphicon-menu-up").off('click');                //pjax遷移時はイベントが多重登録されるのでクリックされるたびに初期化する
    $(".glyphicon-menu-up").on("click",function(){       //初期化をしないと 0.1 の上下操作が加算されていき、一度のクリックで大幅に音量が変わるようになる。
      audio.volume = audio.volume + 0.1;
    });
  });
  $(".glyphicon-menu-down").on("click",function(){
    $(".glyphicon-menu-down").off('click');
    $(".glyphicon-menu-down").on("click",function(){
      audio.volume = audio.volume - 0.1;
    });
  });

  //ミュート
  $(".mute").on("click",function(){
    $(".mute").off('click');                               //pjax遷移時はイベントが多重登録されるのでクリックされるたびに初期化する
    $(".mute").on("click",function(){
      if(audio.muted){                                     //ミュートしてるなら
        audio.muted = false;                               //ミュート解除して
        $(this).css("fill","white");                       //アイコンの色を白にする
        $(this).css("stroke","white");
      }else{                                               //ミュートしてないなら
        audio.muted = true;                                //ミュートとして
        $(this).css("fill","green");                       //アイコンの色を緑にする
        $(this).css("stroke","green");
      };
    });
  });

  //１曲リピート
  $(".repeat").on("click",function(){
    $(".repeat").off('click');                             //pjax遷移時はイベントが多重登録されるのでクリックされるたびに初期化する
    $(".repeat").on("click",function(){
      var color = $(this).css("fill");
      if(color == "rgb(255, 255, 255)"){                   //アイコンの色が白だったら
        $("#song").attr({loop: "true"});                   //ループを有効にして
        $(this).css("fill","green");                       //アイコンの色を緑にする
        $(this).css("stroke","green");
      }else{                                               //アイコンの色が白以外（緑）だったら
        $("#song").removeAttr("loop");                     //ループを無効にして
        $(this).css("fill","white");                       //アイコンの色を白にする
        $(this).css("stroke","white");
      };
    });
  });

  //全曲リピート
  $(".repeat_all").on("click",function(){
    $('.repeat_all').off('click');
    $(".repeat_all").on("click",function(){
      var color = $(this).css("fill");
      if(color == "rgb(255, 255, 255)"){
        repeat_all = true;
        $(this).css("fill","green");
        $(this).css("stroke","green");
      }else{
        repeat_all = false;
        $(this).css("fill","white");
        $(this).css("stroke","white");
      };
    });
  });

  //ランダム再生
  $(".random").on("click",function(){
    $('.random').off('click');
    $(".random").on("click",function(){
      var color = $(this).css("fill");
      if(color == "rgb(255, 255, 255)"){
        random = true;
        $(this).css("fill","green");
        $(this).css("stroke","green");
      }else{
        random = false;
        $(this).css("fill","white");
        $(this).css("stroke","white");
      };
    });
  });

});
//pjax遷移時のイベント多重登録を防ぐためにハンドラをoff/onをしてるが、この書き方だと
//ページロード後、初回クリックのみ処理が動かない。なのでjs側でロード後の初回クリックをやっちゃう。力技。
$(function() {
  $(window).load(function() {
    $(".glyphicon-menu-up").click();
    $(".glyphicon-menu-down").click();
    $(".mute").click();
    $(".repeat").click();
    $(".repeat_all").click();
    $(".random").click();
  });
});
