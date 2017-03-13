$(function() {
  $(window).load(function() {
    $(".prev").click();                                         //clickイベントの多重登録をoff/onで防いでるが、
    $(".next").click();                                         //ページロード時の初回クリックのみ効かなくなるのでクリックしておく。
  });
});
$(document).on('ready pjax:end',function(){

  all_music_ids = $('table').data('musicsId');                  //曲のid配列.グローバル

  $(".tr-a-play").on('click', function(e) {                     //再生ボタン押したら
    var click_music_id = $(this).data('songId');                //クリックした位置の曲のidを取得し
    play_music(click_music_id);                                 //曲を再生
    current = all_music_ids.indexOf(click_music_id);            //現在の再生曲の配列での位置（添字）を保存,グローバル
  });

  $(".prev").on("click",function(){                             //戻るを押した時
    $(".prev").off('click');
    $(".prev").on("click",function(){
      if(all_music_ids.length === 0){                           //再生する曲がない時は
        return;                                                 //何もしない
      }
      if(current === 0){                                        //今が１曲目なら
        return play_music(all_music_ids[current]);              //prev_songがないので再生し直す
      }
      current = current - 1                                     //前の曲を再生
      play_music(all_music_ids[current]);
    });
  });

  $(".next").on("click",function(){                             //次へを押した時
    $(".next").off('click');
    $(".next").on("click",function(){
      if(all_music_ids.length === 0){                           //再生する曲がない時は
        return;                                                 //何もしない
      }
      if( current === (all_music_ids.length - 1) ){             //今が最後の曲なら
        return play_music(all_music_ids[current]);              //next_songがないので再生し直す
      }
      current = current + 1                                     //次の曲を再生
      play_music(all_music_ids[current]);
    });
  });
});
$(document).on('ready',function(){
  //以下のendedのリスナーをpjax:endのハンドラに含めてはいけない。pjax遷移のたびにcurrent + 1されてしまう。readyのハンドラ内に書くこと。
  $("#song")[0].addEventListener('ended',function(){
    if(current == (all_music_ids.length - 1)){                  //終わった曲が最後の曲の場合、
      return;                                                   //終了
    }
    current = current + 1                                       //次の曲を再生
    play_music(all_music_ids[current]);
  });
});
