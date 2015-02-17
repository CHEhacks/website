function activateNavItem(id) {
	$(".nav li.active").removeClass("active");
	var selector = ".nav a[href=#" + id + "]";
	$(selector).parent("li")
		.addClass("active");
}

$(function() {
	$(window).scroll(function (){

		// console.log( "window:" + $(window).scrollTop() );
		var windowPosition = $(window).scrollTop();
		// var navHeight = $(".navbar").height();
		// var navPosition = windowPosition + navHeight;

		//Find navstops
		var navstops = [];
		for (var i = $(".nav a").length - 1; i >= 0; i--) {
			var targetId = $($(".nav li a")[i]).attr("href");
			navstops.push($(targetId));
		};

		// console.log(navPosition);
		// console.log($(navstops[0]).offset().top);
		// console.log("offset: " + $(navstops[0]).offset().top);

		if (windowPosition + $(window).height() >= $(document).height()) {
			console.log("bottom!");
			var navstop = navstops[0];
			activateNavItem(navstop.attr("id"));
			console.log(navstop);
			return;
		}

		for (var i = 0; i < navstops.length; i++) {
			var navstop = $(navstops[i]);
			var navstopPosition = navstop.offset().top;

			if (windowPosition >= navstopPosition) {
				console.log(navstop.attr("id"));
				activateNavItem(navstop.attr("id"));
				break;
			};
		};
	});
});