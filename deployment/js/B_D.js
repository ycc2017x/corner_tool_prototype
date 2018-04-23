 $(function() {
	var availableTags = [
 	"Finding new leads",
 	"Speaking at events",
 	"Attending conferences/conventions",
 	"Developing current leads",
 	"Presenting Regis Capabilities",
 	"PowerPoint presentation",
 	"Writing proposals",
 	"Responding to RFPs",
 	"Admin/logistics",
 	"Facilitating meetings",
 	"Facilitating sessions",
 	];
	$("#B_DSelect").autocomplete({
		source: availableTags
	});
  });
