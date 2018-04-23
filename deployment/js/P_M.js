 $(function() {
	var availableTags = [
 	"Financial analysis",
 	"Budget creation",
 	"Writing user stories",
 	"Evaluating stories",
 	"Reviewing/editing",
 	"Client communication (written)",
 	"Client communication (verbal)",
 	"Admin/logistics",
 	"Problem solving",
 	];
	$("#P_MSelect").autocomplete({
		source: availableTags
	});
  });
