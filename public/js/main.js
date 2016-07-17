$(function() {
	var char_counter = 0;
	$(".form-control-group").hide();

	$( "#homepage-question-form" ).keypress(function() {
		char_counter++;
		$(this).attr("rows", "10");
		if (char_counter > 10 ) {
			$(".form-control-group").show();
		}
	});

	$("#homepage-question-form").focusout(function() {
		if (char_counter < 10) {
			$(this).attr("rows", 2);
			char_counter = 0;
		}
	});


	$("#submit-question").click(function() {
		$.ajax({
			type: "POST",
			url: "/question/new",
			data: {
				text: $("homepage-question-form").val(),
				tags: [],
			},
		});
	});

});
