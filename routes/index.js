
/*
 * GET home page.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({ email: String });
var Email = mongoose.model('Email', EmailSchema);

var sponsorsPath =  path.normalize(__dirname + "/../sponsors.json");
var sponsors = {
    loaded: false,
    bronze: undefined,
    silver: undefined,
    gold: undefined
}

//Functions
function loadSponsors(callback) {
    //Create sponsors object
    if (sponsors.loaded == false) {
        fs.readFile(sponsorsPath, function(err, data) {
            
            obj = JSON.parse(data)
            sponsors.bronze = obj.bronze;
            sponsors.silver = obj.silver;
            sponsors.gold = obj.gold;

            if (typeof callback != "undefined") {    
                callback();
            }
        });

    //Use existing sponsors object
    } else {
        if (typeof callback != "undefined") {
            callback();
        }
    }
}

exports.index = function(req, res){
    loadSponsors(function() {
        render('index.ejs', 
        {
            bronzeSponsors: sponsors.bronze, 
            silverSponsors: sponsors.silver,
            gold: sponsors.gold,
            showForm: true
        }, res);
    });
};

exports.signup = function(req, res){
    res.send("lol");
    // if (req.body.email.length > 0) {
    //     Email.findOne({email: req.body.email}, function(err, email) {
    //         if (err) {
    //             return res.send('ERROR', 500);
    //         }
    //         if (email) {
    //             render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: false, email: req.body.email + ' has already been added'}, res);
    //         }
    //         Email.create(req.body, function(err){
    //             if(err) {
    //                 return next(err);
    //             }
    //             render('index', {bronzeSponsorPaths: bronzeSponsorPaths, showForm: false, email: req.body.email + ' added'}, res);
    //         });
    //     });
    // } else {
    //      res.status(400).redirect('back');
    // }
}

var render = function(page, vars, res) {
    express().render(page, vars, function(err, html) {
        console.log(html);
        res.render('outer.ejs', { content: html });
    });
}