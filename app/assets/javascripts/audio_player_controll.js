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

  $(".prev,.next").on("click",function(){                       //前へ、もしくは次へを押した時
    $(".prev,.next").off('click');
    $(".prev,.next").on("click",function(){
      if(all_music_ids.length === 0){                           //再生する曲がない時は
        return;                                                 //何もしない
      }
      if(typeof random !== 'undefined' && random){              //ランダムが定義されていてかつ、有効なら
        return current = random_play(all_music_ids,current);    //ランダム再生
      }
      if($(this).hasClass("prev")){                             //押したボタンが前への場合、
        if(current === 0){                                        //今が１曲目なら
          return play_music(all_music_ids[current]);              //prev_songがないので再生し直す
        }
        current = current - 1                                   //前の曲を再生
        play_music(all_music_ids[current]);
      }
      if($(this).hasClass("next")){                             //押したボタンが次への場合、
        if( current === (all_music_ids.length - 1) ){             //今が最後の曲なら
          if(typeof repeat_all !== 'undefined' && repeat_all){       //リピートが定義されていてかつ、有効なら
            return current = repeat(all_music_ids,current);          //リピート再生
          }
          return play_music(all_music_ids[current]);              //next_songがないので再生し直す
        }
        current = current + 1                                   //次の曲を再生
        play_music(all_music_ids[current]);
      }
    });
  });
});
$(document).on('ready',function(){
  //以下のendedのリスナーをpjax:endのハンドラに含めてはいけない。pjax遷移のたびにcurrent + 1されてしまう。readyのハンドラ内に書くこと。
  $("#song")[0].addEventListener('ended',function(){
    if(typeof random !== 'undefined' && random){                //ランダムが定義されていてかつ、有効なら
      return current = random_play(all_music_ids,current);      //ランダム再生
    }
    if(current == (all_music_ids.length - 1)){                  //終わった曲が最後の曲の場合、
      if(typeof repeat_all !== 'undefined' && repeat_all){         //リピートが定義されていてかつ、有効なら
        return current = repeat(all_music_ids,current);            //リピート再生
      }
      return;                                                   //終了
    }
    current = current + 1                                       //次の曲を再生
    play_music(all_music_ids[current]);
  });
});
function random_id(max,current){                                //ランダムな曲のidを返す。また再生直後のidは返さない。
  while (true){
    var id = Math.floor(Math.random()*(max - 0) + 0);
    if (id != current) {
      break;
    }
  }
  return id;
}
function random_play(all_music_ids,current){
  var current = random_id(all_music_ids.length - 1,current);
  play_music(all_music_ids[current]);
  return current;
}
function repeat(all_music_ids,current){
  var current = 0;
  play_music(all_music_ids[current]);
  return current;
}
