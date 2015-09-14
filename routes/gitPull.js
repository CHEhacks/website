exports.get =  function (req, res) {
	res.send("Can't pull from GET request!");
};

exports.post = function (req, res){
	console.log("Pulling...");
		
	run_cmd("git pull");
	run_cmd("forever restartall");

	console.log("Pulled!");
	res.send("Pulled!", 200);
};

function run_cmd(cmd) {
    var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec(cmd, puts);
}