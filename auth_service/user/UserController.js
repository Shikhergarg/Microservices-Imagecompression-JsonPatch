var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');

// RETURNS ALL THE USERS IN THE DATABASE
//Used for testing
// router.get('/', function (req, res) {
    // User.find({}, function (err, users) {
        // if (err) return res.status(500).send("There was a problem finding the users.");
        // res.status(200).send(users);
    // });
// });


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id',  VerifyToken, function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;