var fs = require('fs');
var path = require('path');

var sponsorsPath =  path.normalize(__dirname + "/../assets/sponsors.json");
var sponsors = {
    loaded: false,
    bronze: undefined,
    silver: undefined,
    gold: undefined,
    partners: undefined
}

//Functions
exports.loadSponsors =  function(callback) {
    //Create sponsors object
    if (sponsors.loaded == false) {
        fs.readFile(sponsorsPath, function(err, data) {
            
            obj = JSON.parse(data)
            sponsors.bronze = obj.bronze;
            sponsors.silver = obj.silver;
            sponsors.gold = obj.gold;
            sponsors.partners = obj.partners;
            sponsors.loaded = true;

            if (typeof callback != "undefined") {    
                callback(sponsors);
            }
        });

    //Use existing sponsors object
    } else {
        if (typeof callback != "undefined") {
            callback(sponsors);
        }
    }
}