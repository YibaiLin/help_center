'use strict'

const Post = require('../models/post');
const Photo = require('../models/photo');
const Category = require('../models/category');

exports.delPost = async function(req, res) {
	const del = req.query.del;

	const _title = req.query.title || '';

	let count = await Post.count({}).exec();

	if (del === 'all') {
		let posts = await Post.deleteMany({}).exec();
		let _count = await Post.count({}).exec();

		if (posts) {
			let delNum = count - _count;

			return res.send('<h1>共有 ' + count + ' 篇文章</h1>\n<h1>已删除 ' + delNum + ' 篇</h1>\n<h1>还剩 ' + _count + ' 篇</h1>')
		}
		else {
			return res.send('删除全部文章失败')
		}
	}
	else if (del === '1' && _title !== '') {
		let post = await Post.deleteOne({title: _title}).exec();
		console.log('删除情况： ' + post);

		if (post) {
			return res.send('<h1>已删除 ' + _title + '</h1>');
		}
		else {
			return res.send('未能删除 ' + _title )
		}
	}
}