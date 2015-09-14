var app = require('../app/app.js');

exports.render = function(page, vars, res) {
	console.log("hello1");
    app.app.render(page, vars, function(err, html) {
    	console.log("hello2");
        res.render('outer.ejs', { content: html });
    });
}