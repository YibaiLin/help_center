const Post = require('../models/post');
const Category = require('../models/category');
const config = require('../config/config');

exports.edit = async function(req, res) {
	const webpageTitle = config.edit.title;
    const user = req.session.user.name;
    const _title = req.query.post;
    const action = req.query.action;

    if (action === 'edit') {

    	console.log('标题： ' + _title)

    	let categories = await Category.find().exec();
    	let post = await Post.find().exec();

        res.render('edit-post', {
        	title: webpageTitle,
        	name: user,
        	post: post[0],
        	categories: categories
        })
    }
}

exports.update = function(req, res) {

}

exports.publish = async function(req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const content = req.body.content;
    const author = req.session.user.name;

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
        content: content,
        author: author
    });

    category1.docs.push(post1._id);
    await category1.save();

    await post1.save();

    res.send('<h1>发表成功!</h1>')
}

exports.addNew = async function(req, res) {
    const title = config.edit.title;
    const name = req.session.user.name;
    const categories = await Category.find().exec()

    res.render('add-new', {
        title: title,
        name: name,
        categories: categories
    });
}
