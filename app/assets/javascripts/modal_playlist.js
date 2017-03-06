$(document).on('ready pjax:end',function(){
  $(".input").on("keyup", function() {            //入力するたび

    display_number_of_remaining_characters(this)  //残り入力可能文字数の表示

    active_inactive_of_button()                   //作成ボタンのアクティブ、非アクティブ

  });
  $(".create_playlist").on('click', function() {
    var public_state = $('input[name=public_state]:checked').val();
  });
});
function display_number_of_remaining_characters(self){
  var input_length = $(self).val().length;
  if($(self).hasClass("title_text")){             //タイトルを入力してる時
    var remain = 20 - input_length;
    $('.title_max').text(remain);
  }
  if($(self).hasClass("desc_text")){              //説明を入力してる時
    var remain = 40 - input_length;
    $('.desc_max').text(remain);
  }
}
function active_inactive_of_button(){
  var title_text_length = $('.title_text').val().length;
  var desc_text_length = $('.desc_text').val().length;
  if( (title_text_length > 0 && title_text_length <= 20) && (desc_text_length > 0 && desc_text_length <= 40) ) {
    $(".create_playlist").css('opacity',"1");
    $(".create_playlist").addClass("active");
  }else{
    $(".create_playlist").css('opacity',"0.55");
    $(".create_playlist").removeClass("active");
  }
}
