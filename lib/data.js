var fs = require('fs');
var path = require('path');

var dataPath =  path.normalize(__dirname + "/../assets/data.json");
var data = {
    loaded: false,
    bronze: undefined,
    silver: undefined,
    gold: undefined,
    partners: undefined,
    ambassadors: undefined
}

//Functions
exports.loadData =  function(callback) {
    //Create data object
    if (data.loaded == false) {
        fs.readFile(dataPath, function(err, data) {
            
            obj = JSON.parse(data)
            data.bronze = obj.bronze;
            data.silver = obj.silver;
            data.gold = obj.gold;
            data.partners = obj.partners;
            data.ambassadors = obj.ambassadors;
            data.loaded = true;

            if (typeof callback != "undefined") {    
                callback(data);
            }
        });

    //Use existing data object
    } else {
        if (typeof callback != "undefined") {
            callback(data);
        }
    }
}