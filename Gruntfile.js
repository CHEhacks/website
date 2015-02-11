'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		project: {
			assets: ['public/stylesheets'],
			css: ['<%= project.assets %>/sass/style.scss']
		},
		sass: {
			dev: {
				options: {
					style: 'nested',
					compass: false
				},
				files: {
					'<%= project.assets %>/css/style.css':'<%= project.css %>',
					'<%= project.assets %>/css/index.css':'<%= project.assets %>/sass/index.scss'
				}
			}
		},
		watch: {
		    sass: {
		        files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
		        tasks: ['sass:dev']
		    }
		},
		wiredep: {
		  task: {
		    src: [
		      'views/*.ejs',
		      '<%= project.assets %>/**/*.scss'
		    ],

		    options: {
		      // See wiredep's configuration documentation for the options
		      // you may pass:

		      // https://github.com/taptapship/wiredep#configuration
		    }
		  }
		}
	});
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['wiredep','sass','watch']);
}