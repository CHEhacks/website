'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		wiredep: {
		  task: {
		  	ignorePath: '../support/',
		    src: [
		      '../views/*.ejs',
		    ]}
		}
	});
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.registerTask('default', ['wiredep']);
}