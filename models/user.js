var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index:true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	activated: {
		type: Boolean,
		required: true,
		default: false
	},
	/*temporaryToken: {
		type: Boolean,
		required: true
	},*/
	tutorial: {
		type: Boolean,
		default: false
	},
	points : {
		type: Array,
		"default" : []
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	console.log("inside of models/user.js");
	console.log(username);
	var query = {username: username};
	User.findOne(query, callback);
}

//module.exports.getPointsbyUsername

module.exports.updatePointsByUsername = function(username, db_points, callback){
	var query = {username: username};
	User.update(query, {$set: {points: db_points}}, callback);
}

module.exports.userActivated = function(username, callback){
	var query = {username: username};
	User.update(query, {$set: {activated: true}}, callback);
}

module.exports.seenTutorial = function(username, callback){
	var query = {username: username};
	User.update(query, {$set: {tutorial: true}}, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}