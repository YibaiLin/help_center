'use strict'

const Post = require('../models/post');
const Photo = require('../models/photo');
const Category = require('../models/category');
const fs = require('fs');
const path = require('path');

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

		if (post) {
			return res.send('<h1>已删除 ' + _title + '</h1>');
		}
		else {
			return res.send('未能删除 ' + _title )
		}
	}
}


exports.getPosts = async function(req, res) {
	const posts = await Post.find({}).exec();

	let html = '';

	posts.forEach(post => {
		html += '<h1>' + post.title + '</h1>';
		html += '<h1>' + post.meta.updateAt + '</h1>';
	})

	return res.send(html);
}

exports.getCategories = async function(req, res) {
	const cates = await Category.find({}).exec();

	let html = '';

	cates.forEach(cate => {
		html += '<h1>' + cate.name + '</h1>';
		html += '<h1>' + cate.docs + '</h1>';
	})

	return res.send(html);
}

exports.showPost = async function(req, res) {
	const _title = req.query.title;

	const post = await Post.findOne({title: _title}).populate('category').exec();

	if (post) {
		let html = '';
		html += '<h5>title:  ' + post.title + '</h5>';
		html += '<h5>path:  ' + post.path + '</h5>';
		html += '<h5>_id:  ' + post._id + '</h5>';
		html += '<h5>category._id:  ' + post.category._id + '</h5>';
		html += '<h3>update Time: ' + post.meta.updateAt + '</h3>';
		html += '<textarea style="width: 80%;" rows="40" >' + post.content + '</textarea>';

		return res.send(html);
	}
	else {
		return res.send('<h1>something wrong</h1>')
	}
}

exports.setCategory = async function(req, res) {
	const _name = req.query.name;
	const key = req.query.key;
	const val = req.query.val;
	let html = '';

	const category = await Category.findOne({name: _name}).exec();


	if(category && (key in category)) {

		html += '<h5>' + _name + ' 原来的 ' + key + ' :  ' + category[key]+ '</h5>';
		category[key] = val;

		await category.save()
	}
	else {
		return res.send('<h1>something wrong: ' + key + ' in ' + _name + ': ' + (key in category) + '</h1>')
	}

	let filter = {};

	if (key !== 'name') {
		filter = {
			name: _name
		}
	}
	else {
		filter = {
			_id: category._id
		}
	}

	const newCategory = await Category.findOne(filter).exec();

	if (newCategory) {
		html += '<h5>' + _name + ' 原来的 ' + key + ' :  ' + category[key]+ '</h5>';

		return res.send(html)
	}
	else {
		return res.send('<h1>something wrong when making the second seach</h1>')
	}
}

exports.changeCategory = async function(req, res) {
	const old = req.query.old;
	const temp = req.query.temp;
	let html = '<h1>原来分类 ' + old + ' 有文章如下：</h1>';

	const posts = await Post.find({}).populate('category', {name: old}).exec();
	const tempCategory = await Category.findOne({name: temp}).exec();




	if (posts.length > 0 && tempCategory) {
		let temp_docs = tempCategory.docs;
		const temp_id = tempCategory._id;

		for(var i=0; i<posts.length; i++) {
			let _post = posts[i];

			html += '<h5>post: ' + _post.title + ', _id: ' + _post._id + '</h5>';

			_post.category = temp_id;

			temp_docs.push(_post._id);

			await _post.save();
		}

		await tempCategory.save();

		let tempNew = await Category.findOne({name: temp}).exec();

		if (tempNew) {
			html += '<h3>' + temp + ' 现在的 docs: ' + tempNew.docs + '</h3>';
		}

		return res.send(html);
	}
	else {
		return res.send('<h1>something wrong</h1>')
	}
}

exports.copyPosts = async function(req, res) {
	const posts = await Post.find({}).exec();

	const sources = posts;

	let html = '';

	for (let i=0; i< sources.length; i++) {
		let source = sources[i];
		html += '<h4>' + (i + 1) + '  ' + source.title + '</h4>';
		html += '<textarea style="width: 80%" rows="40">' + source.content + '</textarea>'
	}

	return res.send(html);
}