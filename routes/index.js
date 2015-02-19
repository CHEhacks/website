
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
removeDSStore(bronzeSponsorPaths);

function removeDSStore(array) {
	var dsStoreIndex = array.indexOf('.DS_Store');
	if (dsStoreIndex > -1)
	array.splice(dsStoreIndex, 1);
} 

exports.index = function(req, res){
	fs.readdir( "public/images/bronze", function(err, fileNames) {
		removeDSStore(fileNames);
		bronzeSponsorPaths = fileNames;
		console.log(bronzeSponsorPaths);
	});
 	render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: true}, res);
};

exports.signup = function(req, res){
	if (req.body.email.length > 0) {
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
	} else {
		 res.status(400).redirect('back');
	}
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