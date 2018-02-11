$(function() {
	$(".moveout").click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		var that = $(this);

		$.get(url, function(res, status) {
			console.log(status);
			if(res && res.success) {
				console.log('移出操作成功')
				that.parents("tr").remove();
			}
			else {
				console.log('移出操作失败')
			}
		})
	})
})