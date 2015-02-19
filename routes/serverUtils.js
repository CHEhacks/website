var gitPull = {
	get: function (req, res) {
		res.send("Can't pull from GET request!");
	},
	post: function (req, res) {
		console.log("Pulling...");
		run_cmd("git pull");
		// run_cmd("git stash", function() {
		// 	run_cmd("git pull origin master", function() {
		// 		run_cmd("git stash apply");		
		// 	});	
		// });
		
		console.log("Pulled!");
		res.send("Pulled!", 200);
	}
}

function run_cmd(cmd) {
    var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec(cmd, puts);
}

exports.gitPull = gitPull;