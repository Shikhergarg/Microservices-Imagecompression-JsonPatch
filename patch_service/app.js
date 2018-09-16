var express = require('express');
var app = express();
global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


var JsonPatchController = require(__root + 'patch/JsonPatchController');
app.use('/api/jsonpatch', JsonPatchController);

module.exports = app;