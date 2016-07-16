$(function() {
	$( "#homepage-question-form" ).keypress(function() {
		$(this).attr("rows", "10");
		$(this).focusout(function() {
			$(this).attr("rows", 1);
		});
	});
});
