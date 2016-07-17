$(function() {
	var char_counter = 0;
	$( "#homepage-question-form" ).keypress(function() {
		char_counter++;
		$(this).attr("rows", "10");
	});

	$("#homepage-question-form").focusout(function() {
		if (char_counter < 20) {
			$(this).attr("rows", 1);
			char_counter = 0;
		}
	});

});
