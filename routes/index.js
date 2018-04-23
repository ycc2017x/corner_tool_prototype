var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require('nodemailer');

var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log('inside the index.js route, handling .get(/')
	console.log(req.user);
	//res.send({user: req.user});

	
	res.render('index', {name: req.user.name, id: req.user.id, username: req.user.username});
});
/*
router.get('/data.json', ensureAuthenticated, function(req, res){
	console.log('inside the index.js route, handling .get(/data.json')
	console.log(req.user);
	console.log(req.user.points);
	//res.send({user: req.user});
	//res.render('index', {name: req.user.name, id: req.user.id, points: req.user.points});
	res.send({points: req.user.points});
});*/

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;

