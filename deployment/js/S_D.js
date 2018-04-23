 $(function() {
	var availableTags = [
 	"Java",
 	"Javascript",
 	"HTML",
 	".NET",
 	"C#",
 	"SQL",
 	"C++",
 	"React",
 	];
	$("#S_DSelect").autocomplete({
		source: availableTags
	});
  });
