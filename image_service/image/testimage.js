var thumb = require('node-thumbnail').thumb;

// thumb(options, callback);

thumb({
	source: 'c:\\users\\shikher.garg\\downloads\\securing-restful-apis-with-jwt-master\\securing-restful-apis-with-jwt-master\\image\\testimage', // could be a filename: dest/path/image.jpg
	destination: 'c:\\users\\shikher.garg\\downloads\\securing-restful-apis-with-jwt-master\\securing-restful-apis-with-jwt-master\\image\\testimage',
	width: 50
}, function (files, err, stdout, stderr) {
	console.log('all done!');
});

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	res.writeHead(200, { 'content-type': 'image/jpg' });
	fs.createReadStream('./testimage/abc.jpg').pipe(res);
}).listen(8080);
console.log('server running at 8080');