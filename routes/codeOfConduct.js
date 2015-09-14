var path = require('path');

exports.get = function(req, res) {
	res.sendfile(path.join(__dirname, '../public/assets/pdf', 'Code_of_Conduct.pdf'));
}