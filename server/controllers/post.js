const Post = require('../models/post');
const Photo = require('../models/photo');
const Category = require('../models/category');
const config = require('../config/config');

exports.action = async function(req, res) {
	const webpageTitle = config.edit.title;
    const user = req.session.user.name;
    const _path = req.query.post;
    const action = req.query.action;

    if (action === 'modify') {

    	let categories = await Category.find().exec();
    	let post = await Post.findOne({path: _path}).populate('category').exec();
        const photos = await Photo.find().exec()

        res.render('edit-post', {
        	title: webpageTitle,
        	name: user,
        	post: post,
        	categories: categories,
            photos: photos
        })
    }

    if (action === 'delete') {
        let _post = await Post.findOne({path: _path}).populate('category').exec();

        let _docs =  _post.category.docs;
        
        for (var i=0; i < _docs.length; i++) {
            if (_docs[i].str === _post._id.str) {
                _docs.splice(i, 1);
                i--;
            }
        }

        await Category.findOneAndUpdate({name: _post.category.name}, {$set: {docs: _docs}}).exec();

        await Post.deleteOne({path: _path}).exec()  

       
        return res.redirect('/admin/all-posts')

    }
}

exports.update = async function(req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const content = req.body.content;
    const author = req.session.user.name;

    const _path = req.params.post;
    const _post = await Post.findOne({path: _path}).populate('category').exec();

    let _docs =  _post.category.docs;

    for (var i=0; i < _docs.length; i++) {
        if (_docs[i].str === _post._id.str) {
            _docs.splice(i, 1);
            i--;
        }
    }

    await Category.findOneAndUpdate({name: _post.category.name}, {$set: {docs: _docs}}).exec();


    let category1 = await Category.findOne({name: category}).exec()
    let postUpdated = await Post.findOneAndUpdate({path: _path}, {
        category: category1._id,
        title: title,
        path: title.replace(/\s/g, '-') + '.html',
        content: content,
        author: author
    }, {new: true}).exec()

    category1.docs.push(postUpdated._id);

    await category1.save();

    return res.redirect('/admin/all-posts');
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

    return res.redirect('/admin/all-posts')
}

exports.addNew = async function(req, res) {
    const title = config.edit.title;
    const name = req.session.user.name;
    const categories = await Category.find().exec()
    const photos = await Photo.find().exec()

    res.render('add-new', {
        title: title,
        name: name,
        categories: categories,
        photos: photos
    });
}
