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
        let _name = _post.category.name;

        const _category = await Category.findOne({name: _name}).populate('docs').exec();
        const posts = _category.docs;

        // 从原分类中剔除旧文章
        if (posts.length > 0) {
            for (var i=0; i < posts.length; i++) {

                if (posts[i].id === _post.id) {
                    _docs.splice(i, 1);
                    break;
                }
            }
        }


        await Category.findOneAndUpdate({name: _name}, {$set: {docs: _docs}}).exec();

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

    let _name =  _post.category.name;
    let _docs = _post.category.docs;
    const _category = await Category.findOne({name: _name}).populate('docs').exec();
    const posts = _category.docs;

    // 从原分类中剔除旧文章
    if (posts.length > 0) {
        for (var i=0; i < posts.length; i++) {

            if (posts[i].id === _post.id) {
                _docs.splice(i, 1);
                break;
            }
        }
    }

    await Category.findOneAndUpdate({name: _name}, {$set: {docs: _docs}}).exec();

    // 将文章添加到新的分类中
    let category1 = await Category.findOne({name: category}).exec()
    category1.docs.push(_post._id);
    await category1.save();

    // 更新文章的内容
    await Post.findOneAndUpdate({path: _path}, {$set:{
        category: category1._id,
        title: title,
        path: title.replace(/\s/g, '-') + '.html',
        content: content,
        author: author
    }}).exec()

    return res.redirect('/admin/all-posts');
}

exports.publish = async function(req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const content = req.body.content;
    const author = req.session.user.name;

    let category1 = await Category.findOne({name: category}).exec()

    if (!category1) {
        console.log('必须选择一个分类')
    }

    let post1 = new Post({
        category: category1._id,
        title: title,
        path: title.replace(/\s/g, '-') + '.html',
        content: content,
        author: author
    });

    console.log('new Post 会生成_id 吗？post1._id: ' + post1._id)
    await post1.save();
    
    let post2 = await Post.find({title: title}).exec();

    console.log('new Post 会生成_id 吗？post2._id: ' + post2._id)

    category1.docs.push(post1._id);
    await category1.save();


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
