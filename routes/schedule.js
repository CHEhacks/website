var render = require('../lib/render.js')

exports.get = function(req, res) {
	render.render('schedule.ejs', {}, res); 
};