function activateNavItem(id) {
	$(".nav li.active").removeClass("active");
	var selector = ".nav a[href=#" + id + "]";
	$(selector).parent("li")
		.addClass("active");
}

$(function() {
	$(window).scroll(function (){

		var windowPosition = $(window).scrollTop();

		//Find navstops
		var navstops = [];
		for (var i = $(".nav a").length - 1; i >= 0; i--) {
			var targetId = $($(".nav li a")[i]).attr("href");
			navstops.push($(targetId));
		};

		if (windowPosition + $(window).height() >= $(document).height()) {
			var navstop = navstops[0];
			activateNavItem(navstop.attr("id"));
			return;
		}

		for (var i = 0; i < navstops.length; i++) {
			var navstop = $(navstops[i]);
			var navstopPosition = navstop.offset().top;

			if (windowPosition >= navstopPosition) {
				activateNavItem(navstop.attr("id"));
				break;
			};
		};
	});
});