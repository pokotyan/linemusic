$(document).on('ready pjax:success',function(){
  //曲の連続再生の処理
  $(".tr-a-play").on('click', function(e) {
    var all_music_ids = $('table').data('musicsId');      //曲のid一覧の配列
    var click_music_id = $(this).data('songId');          //クリックしたの曲のid
    console.log(`全曲は${all_music_ids}`);

    //クリックした曲"以降"の残りの曲idの配列の作成
    var nokori_music_ids = all_music_ids.slice();         //配列のコピー
    while(nokori_music_ids.indexOf(click_music_id) >= 0){ //クリックした曲が配列に存在してる間
      nokori_music_ids.shift();                           //配列の先頭要素を削除
    }

    //連続再生
    console.log(`選んだ曲は${click_music_id} 残りの曲は${nokori_music_ids} つぎの曲は${nokori_music_ids[0]}`);
    $('#song').on('ended', function (e) {                 //曲が終わったら
      if(nokori_music_ids.length != 0){                   //残りの曲があれば
        play_music(nokori_music_ids[0]);                  //残りの曲idの配列の先頭を再生
        nokori_music_ids.shift();                         //残りの曲idの配列の先頭を削除
      }
    });
  });
});
