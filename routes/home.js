var sponsors = require('../lib/sponsors.js')
var render = require('../lib/render.js')

exports.get = function(req, res){
    sponsors.loadSponsors(function(sponsors) {
        render.render('index.ejs', 
        {
            bronzeSponsors: sponsors.bronze, 
            silverSponsors: sponsors.silver,
            gold: sponsors.gold,
            showForm: true
        }, res);
    });
};