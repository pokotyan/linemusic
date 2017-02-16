$(document).on('ready pjax:success',function(){
    hide_search_result();                             //ページ遷移時や検索窓からフォーカス外したら結果表示を消す
    $("#search_input").on("keyup focus", function() { //キーを押すたび
        var input = $("#search_input").val();
        $("#incremental").empty();                    //初期化（検索結果を一旦全部消す）
        if (input.length !== 0) {                     //文字があれば
            $.ajax({
                type: 'GET',
                url: '/search/incremental_search',
                data: { input: input },
                dataType: 'json'
            })
            .done(function(data) {
                //dataは以下のようなハッシュになっており、バリューが検索結果の配列構造
                //{ songs:[Songの検索結果配列], artists:[Artistの検索結果配列], albums:[Albumの検索結果配列] }
                if(!!data.songs[0] || (!!data.artists[0]) || (!!data.albums[0])){  //検索結果が何かしらあれば
                    prepend_display_more();
                    if(!!data.songs[0]){                                           //songの検索結果があれば
                        append_search_results_for_song(data.songs);
                    }
                    if(!!data.artists[0]){                                         //artistの検索結果があれば
                        append_search_results_for_artist(data.artists);
                    }
                    if(!!data.albums[0]){                                          //albumの検索結果があれば
                        append_search_results_for_album(data.albums);
                    }
                }else{                                                             //検索結果が何もなければ
                    prepend_display_none();
                }
            });
        }
    });
    function hide_search_result(){
        $("#incremental").empty();                  //ページ遷移したら結果表示は一旦全部消す
        $("#search_input").blur(function(){         //検索窓からフォーカス外したら
            setTimeout(function(){                  //150ミリ秒後に結果表示を消す
                $("#incremental").empty();          //（時間をおいて表示を消さないと、検索結果のリンクをクリックしようとしても
            },150);                                 //先に表示が消えちゃってリンクがクリックできなくなる。）
        });
    }
    function prepend_display_more(){
        $(".incre_more").remove();           //項目を一旦消す
        var more_a = '<a href="" onclick=' + "$('#search_submit').click();" + '>検索結果をもっと見る</a>';
        var more =
            '<ul class="dropdown-menu incre_more">' +
                '<li>' + more_a + '</li>' +
            '</ul>';
        $("#incremental").prepend(more);     //「もっと見る」は常に親の直下に追加（prepend）
    }
    function prepend_display_none(){
        $(".incre_none").remove();
        var none =
            '<ul class="dropdown-menu incre_none">' +
                '<li><a>検索結果がありません</a></li>' +
            '</ul>';
        $("#incremental").prepend(none);
    }
    function append_search_results_for_song(songs){
        //項目名の追加
        $(".incre_results_song").remove();   //項目を一旦消す
        var title_song =
            '<ul class="dropdown-menu incre_results_song">' +
                '<li><h5>ソング</h5></li>' +
            '</ul>';
        $("#incremental").append(title_song);
        //結果の追加
        for (var i=0 ; i<=2 ; i++){          //検索結果は3つまで表示
            append_a_tag_for_song(songs[i]);
        }
    }
    function append_a_tag_for_song(song){
        var song_a =
            '<a class="incre_play" onclick="play_music(' + song.id + '); return false;" href="javascript:void(0)">' + song.name + '</a>';
        $(".incre_results_song").append(song_a);
    }
    function append_search_results_for_artist(artists){
        $(".incre_results_artist").remove();
        var title_artist =
            '<ul class="dropdown-menu incre_results_artist">' +
                '<li><h5>アーティスト</h5></li>' +
            '</ul>';
        $("#incremental").append(title_artist);
        for (var i=0 ; i<=2 ; i++){
            append_a_tag_for_artist(artists[i]);
        }
    }
    function append_a_tag_for_artist(artist){
        var artist_a =
            '<a href="/artists/' + artist.id + '">' + artist.name + '</a>';
        $(".incre_results_artist").append(artist_a);
    }
    function append_search_results_for_album(albums){
        $(".incre_results_album").remove();
        var title_album =
            '<ul class="dropdown-menu incre_results_album">' +
                '<li><h5>アルバム</h5></li>' +
            '</ul>';
        $("#incremental").append(title_album);
        for (var i=0 ; i<=2 ; i++){
            append_a_tag_for_album(albums[i]);
        }
    }
    function append_a_tag_for_album(album){
        var album_a =
            '<a href="/albums/' + album.id + '">' + album.name + '</a>';
        $(".incre_results_album").append(album_a);
    }
});
