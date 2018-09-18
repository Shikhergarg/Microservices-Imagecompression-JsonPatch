var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var thumb = require('node-thumbnail').thumb;
var downloader = require('image-downloader');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));

// Compress a Image
router.post('/', VerifyToken, function (req, res) {
	
	var imageurl = req.body.url;
	const options = {
		url: imageurl,
		dest: './image/testimage',                  // Save to /path/to/dest/image.jpg
		done: function (err, filename, image) {
			if (err) {
				res.status(200).send("Invalid URL");
			}
			else {
				thumb({
					source: filename, // could be a filename: dest/path/image.jpg
					destination: './image/testimage',
					width: 50,
					overwrite: true
				}, function (files, err) {
					console.log(files[0].srcPath);
					res.writeHead(200, { 'content-type': 'image/jpg' });
					fs.createReadStream(files[0].dstPath).pipe(res);
				});
			}
		}
	};
	downloader(options);
	
});


module.exports = router;
 