'use strict'

const Post = require('../models/post');

module.exports = async function(req, res, next) {
	const posts = await Post.find({}).exec();

	const spaRouters = posts.map(function(post) {
		return '/' + post.path;
	});

	const path = req.path;

	console.log('404 judge: ' + path)

	if (spaRouters.indexOf(path) !== -1) {
		console.log('pass ' + path + ' to spa');
		next();
	}
	else {
		res.render('404', {
		  	title: 'Edns-Not found'
	    });
	}
}
