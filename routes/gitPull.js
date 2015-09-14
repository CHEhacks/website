var app = require('../app/app.js')

exports.get =  function (req, res) {
	res.send("Can't pull from GET request!");
};

exports.post = function (req, res){
	console.log("Pulling...");
	
	if (typeof app.get('gitPath') != 'undefined'){
		run_cmd("cd " + app.get('gitPath')  + " && git pull");	
	} else {
		run_cmd("git pull");
	}
	
	console.log("Pulled!");

	run_cmd("forever restartall");	

	res.send("Pulled!", 200);
};

function run_cmd(cmd) {
    var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec(cmd, puts);
}