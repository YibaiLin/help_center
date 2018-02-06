const Admin = require('../controllers/admin');
const User = require('../controllers/user');
const Post = require('../controllers/post');
const Category = require('../controllers/category');

module.exports = function(app) {
	
	app.get('/admin/dashboard', User.signinRequired, User.adminRequired, Admin.index);
	app.get('/admin/all-posts', User.signinRequired, User.adminRequired, Admin.allPosts);
	app.get('/admin/all-categories', User.signinRequired, User.adminRequired, Admin.allCategories);

	// 文章编辑
	app.get('/admin/add-new', User.signinRequired, User.adminRequired, Post.addNew);
	app.post('/admin/post/publish', User.signinRequired, User.adminRequired, Post.publish);

	app.get('/admin/posts', User.signinRequired, User.adminRequired, Post.action)
	app.post('/admin/posts/:post/update', User.signinRequired, User.adminRequired, Post.update);


	// 新建分类
	app.post('/admin/category/add', User.signinRequired, User.adminRequired, Category.add);
	// 分类的修改页面、删除分类api
	app.get('/admin/categories', User.signinRequired, User.adminRequired, Category.action);
	// 更新分类api
	app.post('/admin/categories/:slug/update', User.signinRequired, User.adminRequired, Category.update);

	// 获取数据 api
	app.get('/getDocs', Admin.getDocs);

	app.get('/getCategories', Admin.getCategories);



	// User
    app.get('/signup', User.showSignup)
    app.get('/signin', User.showSignin)
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/admin/logout', User.logout)
    // app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

}