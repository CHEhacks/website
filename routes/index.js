
/*
 * GET home page.
 */

var express = require('express');
var fs = require('fs');

var mongoose = require('mongoose');
var EmailSchema = new mongoose. Schema({
	email: String
});
var Email = mongoose.model('Email', EmailSchema);

bronzeSponsorPaths = fs.readdirSync( "public/images/bronze");

exports.index = function(req, res){
 	render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: true}, res);
};

exports.signup = function(req, res){
	Email.findOne({email: req.body.email}, function(err, email) {
		if (err) {
			return res.send('ERROR', 500);
		}
		if (email) {
			render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: false, email: req.body.email + ' has already been added'}, res);
		}
		Email.create(req.body, function(err){
			if(err) {
				return next(err);
			}
			render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: false, email: req.body.email + ' added'}, res);
		});

	});
}

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