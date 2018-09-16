var app = require('./app');
var port = process.env.PORT || 8000;

var mongoose = require('mongoose');
//mongoose.connect('mongodb://div:12345@ds031975.mlab.com:31975/redcarp');
mongoose.connect('mongodb://Shikher:123456s@ds151892.mlab.com:51892/socialcopsassignment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected correctly to server");
	app.emit("app_started");
});

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
module.exports = app;