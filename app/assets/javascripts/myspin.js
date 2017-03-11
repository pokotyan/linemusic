$(document).on('pjax:start',function(){
  var spinner = new Spinner().spin();
  spinner.spin();
  $(".spinner_overlay").fadeIn().append(spinner.el);
  $(document).on('pjax:end ready', function() {
    spinner.stop();
    $(".spinner_overlay").fadeOut();
  });
});
