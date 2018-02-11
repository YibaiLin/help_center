$(function() {

	var path = location.pathname;

	$(".child-link").each(function() {
		var href = $(this).attr('href');

		if (href === path) {
			$(this).parent().show();
			$(this).find('.child-name').addClass('child-focus').next('.triangle').show();
		}
	})

	$(".left-sidebar button").click(function() {

		if ($(this).attr('class').indexOf('active') === -1) {
			$(".left-sidebar button").removeClass('active');
			$(".child-item").hide();

			$(this).addClass('active');
			$(this).next('div.child-item').show();
		}
		else {
			$(".left-sidebar button").removeClass('active');
			$(".child-item").hide();
		}
	});
})