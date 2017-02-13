$(document).on('ready pjax:success',function(){
  $("#search_submit").on("click",function(){
    $("#search_submit").off('click');
    $("#search_submit").on("click",function(){                       //検索ボタンを押したら
      var search_text = $("#search_input").val();                    //検索文字列を取得して
      $("#search_trigger").attr("href","/search/" + search_text)    //searchs#showアクションへのhrefをaタグに設定して
      $("#search_trigger").click();                                  //searchs#showアクションを叩く
    });
  });
});
//pjax遷移時のイベント多重登録を防ぐためにハンドラのoff/onをしてるが、
//これだとページロード時の初回クリックが動かないため、js側で初回クリックをやっておく。
$(document).on('ready',function(){
  $("#search_submit").click();
});
