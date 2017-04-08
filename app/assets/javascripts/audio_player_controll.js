$(function() {
  $(window).load(function() {
    $(".prev").click();                                         //clickイベントの多重登録をoff/onで防いでるが、
    $(".next").click();                                         //ページロード時の初回クリックのみ効かなくなるのでクリックしておく。
  });
  controll = {                                                  //オーディオプレイヤーの全曲リピートとランダムのブール値。
    repeat_all:false,                                           //この値はaudio_player.jsにてtrue/falseが切り替わる
    random:false                                                //ページ読み込み時に値はfalseになる。pjax遷移時は値そのまま。
  };
});
$(document).on('ready pjax:end',function(){
  //曲のidの配列を制御するイテレータ
  iterator = (function(){                                       //いろんなイベントで使うのでグローバルで宣言
    //初期化
    var index;
    var data = $('table').data('musicsId') || [];               //曲のテーブルがないページの場合は空の配列
    var length = data.length;
    //パブリックインターフェース（クロージャ）
    return {
      showData:function(){
        return data;
      },
      setIndex:function(idx){
        index = idx;
      },
      next:function(){
        if(!this.hasNext()){
          return null;
        }
        index = index + 1;
      },
      hasNext:function(){
        return index < (length - 1);
      },
      prev:function(){
        if(!this.hasPrev()){
          return null;
        }
        index = index - 1;
      },
      hasPrev:function(){
        return index > 0;
      },
      random:function(){
        index = random_id(length - 1);
      },
      rewind:function(){
        index = 0;
      },
      last:function(){
        index = length - 1;
      },
      current:function(){
        return data[index];
      }
    };
  }());

  $(".tr-a-play").on('click', function(e) {                          //テーブルの再生ボタン押したら
    var click_music_id = $(this).data('songId');                     //クリックした位置の曲のidを取得し
    var idx = iterator.showData().indexOf(click_music_id);           //現在の再生曲の配列での位置（添字）を保存
    iterator.setIndex(idx);                                          //イテレータに現在の位置をセットして
    play_music(iterator.current());                                  //曲を再生
  });

  $('#song').on('ended', function () {                               //再生が終わったら、
    if(controll.random){                                               //ランダムが有効なら
      return play("random");                                           //ランダム再生
    }
    if(!iterator.hasNext()){                                           //終わった曲が最後の曲の場合、
      if(controll.repeat_all){                                           //リピートが有効なら
        return play("rewind");                                           //初めから曲を再生
      }
      return;                                                          //リピートが無効なら終了
    }
    play("next");                                                    //次の曲を再生
  });

  $(".prev,.next").on("click",function(){                            //前へ、もしくは次へを押した時
    $(".prev,.next").off('click');
    $(".prev,.next").on("click",function(){
      if(iterator.showData().length === 0){                            //連続再生する曲がない時（曲のテーブルがないページ）は
        return;                                                        //何もしない
      }
      if(typeof $("#song").attr("loop") != 'undefined'){               //１曲ループが有効なら（audioタグにloop属性があるなら）
        return play_music(iterator.current());                         //再生し直す
      }
      if(controll.random){                                             //ランダムが有効なら
        return play("random");                                         //ランダム再生
      }
      if($(this).hasClass("prev")){                                    //押したボタンが前への場合、
        if(!iterator.hasPrev()){                                         //今が１曲目なら
          if(controll.repeat_all){                                         //リピートが有効なら
            return play("last");                                           //最後の曲を再生
          }
          return play_music(iterator.current());                         //prev_songがないので再生し直す
        }
        play("prev");                                                  //前の曲を再生
      }
      if($(this).hasClass("next")){                                    //押したボタンが次への場合、
        if(!iterator.hasNext()){                                         //今が最後の曲なら
          if(controll.repeat_all){                                         //リピートが有効なら
            return play("rewind");                                         //初めから曲を再生
          }
          return play_music(iterator.current());                         //next_songがないので再生し直す
        }
        play("next");                                                  //次の曲を再生
      }
    });
  });
});

function random_id(max,current){                                     //ランダムな曲のidを返す。また再生直後のidは返さない。
  while (true){
    var id = Math.floor(Math.random()*(max - 0) + 0);
    if (id != iterator.current()) {
      break;
    }
  }
  return id;
}

function play(select){
  iterator[select]();
  play_music(iterator.current());
}
