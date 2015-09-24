function activateNavItem(id) {
	$(".nav li.active").removeClass("active");
	var selector = ".nav a[href=#" + id + "]";
	$(selector).parent("li")
		.addClass("active");
}

$(function() {

	// Typeform configure popup
	(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()

	// Enable tooltips
	$('[data-toggle="tooltip"]').tooltip()


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