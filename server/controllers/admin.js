const path = require('path');

exports.page = function(req, res) {
  const options = {
  	root: __dirname + '../../../public/views/'
  }
  res.sendFile('admin.html', options);
}

exports.post = function(req, res) {
  const post = req.body.post;

  
}