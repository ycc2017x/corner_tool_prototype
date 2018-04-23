 $(function() {
	var availableTags = [
 	"Editorial QA",
 	"Data QA",
 	"Technical QA",
 	"Process QA",
 	"Functional QA",
 	"User Testing",
 	"Acceptance Criteria Reivew",
 	"Technical analysis",
 	"Process analysis",
 	"Financial QA",
 	];
	$("#Q_ASelect").autocomplete({
		source: availableTags
	});
  });
