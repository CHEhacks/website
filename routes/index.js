
/*
 * GET home page.
 */

var express = require('express');
var fs = require('fs');

exports.index = function(req, res){
	bronzeSponsorPaths = fs.readdirSync( "public/images/bronze");
 	render('index', {bronzeSponsorPaths: bronzeSponsorPaths}, res);
};

var render = function(page, vars, res) {
  express().render(page + '.ejs', vars, function(err, html) {
    if(err) {
      console.log(err);
    } else {
      vars.content = html;
      res.render('outer', vars);
    }
  });
}