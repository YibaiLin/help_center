const Post = require('../models/post');
const Category = require('../models/category');
const config = require('../config/config');

exports.index = function(req, res) {
    const title = config.dashboard.title;
    const name = req.session.user.name;

    console.log('dashboard sid: ' + req.sessionID)


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

exports.allCategories = async function(req, res) {
    const title = config.edit.title;
    const name = req.session.user.name;

    const categories = await Category.find({}).exec();

    res.render('all-categories', {
        title: title,
        name: name,
        category: '',
        add: true, // 保存还是更新
        categories: categories
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