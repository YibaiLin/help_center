const path = require('path');
const fs = require('fs');
const Post = require('../models/post');
const Category = require('../models/category');
const mongoose = require('mongoose');

exports.page = function(req, res) {
    const options = {
    	root: __dirname + '../../../public/views/'
    }
    res.sendFile('admin.html', options);
}

exports.publish = async function(req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const content = req.body.post;

    let category1 = await Category.findOne({name: category}).exec()

    if (!category1) {
        category1 = new Category({
          name: category
        })
    }

    let post1 = new Post({
        category: category1._id,
        title: title,
        path: title.replace(/\s/g, '-') + '.html',
        content: content
    });

    category1.docs.push(post1._id);
    await category1.save();

    await post1.save();

    res.send('<h1>发表成功!</h1>')
}

exports.getDocs = async function(req, res) {
    const posts = await Post.find().exec();

    res.send({
        success: true,
        data: posts
    })
}

exports.getCategories = async function(req, res) {
    const categories = await Category.find({}).populate('docs').exec();

    console.log('categories %s', categories[0].name)
    console.log('categories.docs', categories[0].docs)

    res.send({
        success: true,
        data: categories
    })
}