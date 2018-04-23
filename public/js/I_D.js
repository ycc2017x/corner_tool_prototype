 $(function() {
	var availableTags = [
 	"Creative Writing",
 	"Camtasia",
 	"Project managing",
 	"Reviewing/editing",
 	"Storyboarding",
 	"User testing",
 	"Technical Writing",
 	"Problem Solving",
 	"Innovating",
 	"Facilitating",
 	"Researching",
 	"Wireframing",
 	"Captivate",
 	"Lectora",
 	"Interviewing",
 	"scoring models",
 	"Creating Facilitator Materials",
 	"writing assessment questions",
 	"working with SMEs",
 	];
	$("#I_DSelect").autocomplete({
		source: availableTags
	});
  });
