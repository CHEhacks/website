var data = require('../lib/data.js')
var render = require('../lib/render.js')

exports.get = function(req, res){
    data.loadData(function(obj) {
        render.render('index.ejs', 
        {
            bronzeSponsors: obj.bronze, 
            silverSponsors: obj.silver,
            goldSponsors: obj.gold,
            partners: obj.partners,
            ambassadors: obj.ambassadors,
            showForm: true
        }, res);
    });
};