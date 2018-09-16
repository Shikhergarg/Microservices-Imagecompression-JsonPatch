var express = require('express');
var app = express();
global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


var ImageCompressor = require(__root + 'image/ImageController');
app.use('/api/imagecompressor', ImageCompressor);


module.exports = app;