'use strict'

exports.index = function(req, res, next) {
	let options = {
		root: __dirname + '../../../client/build/'
	};
	res.sendFile('index.html', options, function(err) {
		if (err) {
			next(err);
		}
		else {
			console.log('welcome to help center!');
		}
	});
}