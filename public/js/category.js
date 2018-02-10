$(function() {
	$(".moveout").click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');

		jQuery.get(url, function(res, status) {
			if(res && res.success) {
				$(this).parent().remove();
			}
			else {
				console.log('移出操作失败')
			}
		})
	})
})