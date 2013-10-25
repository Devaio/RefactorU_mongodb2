$ () ->

	$(document).on 'submit', '#application-form', (e) ->
		e.preventDefault()

		$.post '/applicant', $(this).serialize(), (data) ->
			$('#success-message').removeClass 'hidden'
			$('#success-message').text data["success"]
			$('.application-input').val ''
			$('#success-message').fadeOut 4000

	$(document).on 'click', '.unqualified', () ->
			$.get '/applicant', { buttonId : $(this).attr('data') }, (data) ->
				console.log data 
			$(this).closest('.applicant').fadeOut()
			setTimeout () ->
				window.location.replace '/applicants', 
				1000