const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VerifyToken = require('./VerifyToken');//Token Middleware Function
const User = require('../user/User');//For Mongo
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('../config'); // get config file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {
	if(req.body.password)
		var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	else
		return res.status(500).send("There was a problem registering the user");
	User.find({
		email : req.body.email
	},
	function (err, user) {
		if(user.length >= 1)
		{
			return res.status(400).send("User Already Exists");
		}
		else 
		{
			User.create({
			name : req.body.name,
			email : req.body.email,
			password : hashedPassword
			}, 
			function (err, user) {
				if (err) 
					return res.status(400).send(err);
				var token = jwt.sign({ id: user._id }, config.secret,{expiresIn: 864000 });// expires in 10 days
				res.status(200).send({ auth: true, token: token });
			});
			
		}
	});
});

router.get('/me', VerifyToken, function(req, res, next) {

	User.findById(req.userId, { password: 0 }, function (err, user) {
	if (err) return 
		res.status(500).send("There was a problem finding the user.");
	if (!user) 
		return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

module.exports = router;