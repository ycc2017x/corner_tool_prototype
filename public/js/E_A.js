 $(function() {
	var availableTags = [
 	"Business development support",
 	"JIRA Administration",
 	"Accounts Payable",
 	"Accounts Receivable",
 	"Account Reconcilitation",
 	"Project Setup",
 	"Project Close-out",
 	];
	$("#E_ASelect").autocomplete({
		source: availableTags
	});
  });
