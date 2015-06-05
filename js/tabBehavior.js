$(document).ready(function() {

  $('#tab-level1 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level1';
  });

  $('#tab-level2 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level2';
  });

  $('#tab-level3 a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
    window.location.hash = 'level3';
  });

});
