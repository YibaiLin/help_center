$(function() {
	var chosenImgPath = '';

	// 打开图片选择 modal 时
	$("#addPhoto").click(function() {
		$(".pickedPhoto").next('img').css('opacity', '0');
		chosenImgPath = '';
	})


	$("textarea").change(function() {
		var val = $(this).val();
		console.log('value is ' + val)
	})

	$(".pickedPhoto").click(function() {
		var checkOpacity = $(this).next('img').css('opacity');
		var img = $(this).find('img')
		var imgSrc = $(this).find('img').attr('src');
		var imgName = $(this).find('img').attr('alt');
		var imgPath = '![' + imgName + '](' + imgSrc + ')';

		if (checkOpacity === '0') {
			$(".pickedPhoto").next('img').css('opacity', '0');
			chosenImgPath = '';

			$(this).next('img').css('opacity', '1');
			chosenImgPath = imgPath;
		}
		else {
			$(this).next('img').css('opacity', '0');
			chosenImgPath = '';
		}
		
	})

	$("#addImgPath").click(function() {
		var content = $("textarea").val();

		console.log('添加图片前的内容：' + content);

		if (chosenImgPath === '') {
			console.log('未选择图片');
		}
		else {
			content += '\r\n' + chosenImgPath;

			console.log('添加图片后的内容：' + content)

			$("textarea").val(content);
		}
	})
})