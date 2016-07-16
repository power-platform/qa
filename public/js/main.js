$(function() {
	var char_counter = 0;
	$( "#homepage-question-form" ).keypress(function() {
		char_counter++;
		$(this).attr("rows", "10");
		if (char_counter < 20) {
			$(this).focusout(function() {
				$(this).attr("rows", 1);
			});
			char_counter = 0;
		}
	});
});
