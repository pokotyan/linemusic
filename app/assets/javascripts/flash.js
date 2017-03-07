$(document).on('pjax:popstate pjax:end',function(){
  if($('.alert-info,.alert-danger')[0]){
    $('.alert-info').remove();
    $('.alert-danger').remove();
  }
});
