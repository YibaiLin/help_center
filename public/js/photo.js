$(function() {
	$("#multiSelect").click(function() {
		$("#actionBox").toggle();
		$(this).parent().toggle();
	})
	
	$("#resetSelect").click(function() {
		$("#actionBox").hide();
		$("#actionBox").prev().show()
	})
})