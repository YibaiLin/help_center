$(function() {
	var fileInput = $("#fileInput");
	var dropbox = $("#dropbox");

	$("#filePick").click(function() {
		if (fileInput) {
			fileInput.click();
		}
	})


	

	function handleFiles(files) {
		var fileList = files;

		console.log('files len: ' + fileList.length)

	}

	// dropbox.dragenter(dragenter);
	// dropbox.dragover(dragover);
	// dropbox.drop(drop);


	// function dragenter(e) {
	//   e.stopPropagation();
	//   e.preventDefault();
	// }

	// function dragover(e) {
	//   e.stopPropagation();
	//   e.preventDefault();
	// }

	// function drop(e) {
	//   e.stopPropagation();
	//   e.preventDefault();

	//   var dt = e.dataTransfer;
	//   var files = dt.files;

	//   handleFiles(files);
	// }

})