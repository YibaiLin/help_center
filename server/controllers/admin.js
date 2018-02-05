const Post = require('../models/post');
const Category = require('../models/category');
const config = require('../config/config');

exports.index = function(req, res) {
    const title = config.dashboard.title;
    const name = req.session.user.name;

    res.render('dashboard', {
        title: title,
        name: name
    });
}

exports.allPosts = async function(req, res) {
    const title = config.edit.title;
    const name = req.session.user.name;
    const posts = await Post.find().populate('category').exec();

    res.render('all-posts', {
        title: title,
        name: name,
        posts: posts
    });
}

exports.allCategories = function(req, res) {
    const title = config.edit.title;
    const name = req.session.user.name;

    res.render('all-categories', {
        title: title,
        name: name
    });
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