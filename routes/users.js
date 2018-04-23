var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var nodemailer = require('nodemailer');
//var bodyParser = require('body-parser');
//app.use(bodyParser.json());


var User = require('../models/user');

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
    console.log('redirecting to / while in routes/users.js');
    //	console.log(req.user);
});
/*
router.get('/points', function(req,res){
	var points = [
		{
			id: 1,
			name: 'riles'
		}
	];
	/*var user = req.params.id;
	user = JSON.stringify(user);
	console.log("id sent to server" + user);
	console.log(typeOf(user));
	


	User.getUserByUsername(user, function(err, foundUser) {
		if(err){
			throw err;
			req.flash("error", "User not found");
			console.log('ERROR')
			res.redirect('/');
		}
		console.log(foundUser.toArray());
			res.send({user: foundUser.toArray()});
	})
});*/

router.post('/points', function(req, res) {
    console.log('post in /points');
    var id = req.body.id;
    console.log(id);
    /*
    	var points = [
    		{
    			id: 1,
    			name: 'riles'
    		}
    	];*/

    User.getUserByUsername(id, function(err, foundUser) {
        if (err) {
            throw err;
            req.flash("error", "User not found");
            console.log('ERROR')
            res.redirect('/');
        } else {
            console.log("no errors in /points .getUserByUsername")
            console.log(foundUser);
            res.send({ user: foundUser });
        }
    })
})

router.post('/update', function(req, res) {

    console.log('inside of /update');
    var points = req.body.db_points;
    var id = req.body.id; // req.body.id isn't really the id, finding documents by id just wasn't working so I used the username functions
    console.log(points);
    console.log(id);


    User.updatePointsByUsername(id, points, function(err, tbd) {
        if (err) {
            throw err;
            req.flash("error", "unable to insert points[]");
            console.log("ERROR while updating points[]");
            res.redirect("/");
        }
        console.log(tbd);
        res.send("Much success!");
    })
})

router.post('/tutorialseen', function(req, res) {

    console.log('inside of /tutorialseen');
    //var points = req.body.db_points;
    var id = req.body.id; // req.body.id isn't really the id, finding documents by id just wasn't working so I used the username functions
    //console.log(points);
    console.log(id);


    User.seenTutorial(id, function(err, tbd) {
        if (err) {
            throw err;
            req.flash("error", "unable to update tutorial field");
            console.log("ERROR while updating tutorial field");
            res.redirect("/");
        }
        console.log(tbd);
        res.send("Much success! in seenTutorial");
    })
})

// Register User
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        console.log('inside of /register')
        console.log(newUser);

        const output = `
	    <p>You have a new contact request</p>
	    <h3>Contact Details</h3>
	    <ul>  
	      <li>Name: ${req.body.name}</li>
	      <li>Email: ${req.body.email}</li>
	    </ul>
	    <h3>Message</h3>
	    <p>Here is the info for a new user on the Your Corner Tool</p>
	  `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'rmllr000@gmail.com', // generated ethereal user
                pass: 'dd3dede5-c3d4-4f84-a2fa-0b971de11979' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Riley Miller" <rmllr000@gmail.com>', // sender address
            to: 'cschultz@yourcornerconsulting.com', // list of receivers
            subject: 'Your Corner New User', // Subject line
            text: 'Your Corner plain text', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            //res.render('contact', { msg: 'Email has been sent' });
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Username or Password is incorrect' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Username or Password is incorrect' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
        console.log('post/login' + req.user.username)
        res.redirect('/' + req.user.username);
    });

router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

router.get('/users/:id', function(req, res) {
    User.getUserById(req.params.id, function(err, foundUser) {
        if (err) {
            req.flash("error", "User not found");
            res.redirect("/");
        }
        res.render("users/show", { user: foundUser });
    });
});

module.exports = router;