'use strict'

const Post = require('../models/post');
const Category = require('../models/category');
const config = require('../config/config');

exports.add = async function(req, res) {
    const name = req.body.category;

    const category =  await Category.findOne({name: name}).exec()

    if (category) {
    	return console.log('该分类已存在')
    }

    const _category = new Category({
    	name: name,
    	slug: name.replace(/\s/g, '-'),
    	docs: []
    })

    let category1 = await _category.save();

    if (!category1) return console.log('保存失败！')

	return res.redirect('/admin/all-categories')
}

exports.update = async function(req, res) {
	const name = req.body.category;
	const _slug = req.params.slug;

	console.log('params.slug is  ' + _slug)

	let category = await Category.findOneAndUpdate({slug: _slug}, {$set: {name: name, slug: name.replace(/\s/g, '-')}}).exec();

	if (category) {
		console.log(category.name);
		return res.redirect('/admin/all-categories')
	}
	return console.log('更新分类出错了')
}

exports.action = async function(req, res) {
	const title = config.edit.title;
    const name = req.session.user.name;

	const _slug = req.query.category;
	const action = req.query.action;

    const categories = await Category.find({}).exec();

	if (action === 'modify') {
    	const category = await Category.findOne({slug: _slug}).exec();

		return res.render('all-categories', {
					title: title,
					name: name,
					category: category,
					add: false,
					categories: categories
			   });
	}

	if (action === 'delete') {
		console.log('slug : ' + _slug)
		let category_1 = await Category.deleteOne({slug: _slug}).exec();

		if (category_1) {
			console.log('删除成功')
		}
		else {
			console.log('未找到对应分类，删除失败')
		}
		return res.redirect('/admin/all-categories')
	}

	console.log('Are we here?')
	return res.redirect('/admin/all-categories');
}