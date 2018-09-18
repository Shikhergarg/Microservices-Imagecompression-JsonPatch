var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jsonpatch = require('fast-json-patch');
var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
// Apply Json Patch over JSON Object 
router.post('/', VerifyToken, function (req, res) {
	try {
		var patch = JSON.parse(req.body.jsonpatch);
		var document = JSON.parse(req.body.jsonobj);
	} catch (err) {
		res.status(403).send("JSON Format is wrong");
	}
	
	var errors = jsonpatch.validate(patch, document);
	
	if (errors === undefined) {
		document = jsonpatch.applyPatch(document, patch).newDocument;
		res.status(200).send(document);
	}
	else {
		res.status(200).send(errors);
	}
	
});

module.exports = router;
