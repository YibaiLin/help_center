const path = require('path');
const fs = require('fs');
const Post = require('../models/post');
const Category = require('../models/category');
const mongoose = require('mongoose');
const config = require('../config/config');

exports.index = function(req, res) {
    const title = config.dashboard.title;
    const name = req.session.user.name;

    res.render('dashboard', {
        title: title,
        name: name
    });
}

exports.page = function(req, res) {
    const title = config.edit.title;

    res.render('edit', {
        title: title
    });
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

    res.send({
        success: true,
        data: categories
    })
}