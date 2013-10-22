$(function(){

	$(document).on('submit', '#application-form', function(e){
		e.preventDefault()

		$.post('/applicant', $(this).serialize(), function(data){
			$('#success-message').removeClass('hidden')
			$('#success-message').text(data["success"])
			$('.application-input').val('')
			$('#success-message').fadeOut(4000)
		})
	});

	$(document).on('click', '.unqualified', function(){

			$.get('/applicant', { buttonId : $(this).attr('data') }, function(data){
				console.log($(this).attr('data'))
			});
	});

});