// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    $(document).on('submit', '#application-form', function(e) {
      e.preventDefault();
      return $.post('/applicant', $(this).serialize(), function(data) {
        $('#success-message').removeClass('hidden');
        $('#success-message').text(data["success"]);
        $('.application-input').val('');
        return $('#success-message').fadeOut(4000);
      });
    });
    return $(document).on('click', '.unqualified', function() {
      $.get('/applicant', {
        buttonId: $(this).attr('data')
      }, function(data) {
        return console.log(data);
      });
      $(this).closest('.applicant').fadeOut();
      return setTimeout(function() {
        return window.location.replace('/applicants', 1000);
      });
    });
  });

}).call(this);
