 $(function() {
	var availableTags = [
 	"Mentoring others",
 	"Managing employees",
 	"Managing teams",
 	"Coaching",
 	];
	$("#L_DSelect").autocomplete({
		source: availableTags
	});
  });
