var app = require('../app/app.js');

exports.render = function(page, vars, res) {
    app.app.render(page, vars, function(err, html) {
        res.render('outer.ejs', { content: html });
    });
}