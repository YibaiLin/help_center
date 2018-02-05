const Admin = require('../controllers/admin');
const User = require('../controllers/user');
const Post = require('../controllers/post');

module.exports = function(app) {
	
	app.get('/admin/dashboard', User.signinRequired, User.adminRequired, Admin.index);
	app.get('/admin/all-posts', User.signinRequired, User.adminRequired, Admin.allPosts);
	app.get('/admin/all-categories', User.signinRequired, User.adminRequired, Admin.allCategories);

	// 编辑某个文章
	app.get('/admin/add-new', User.signinRequired, User.adminRequired, Post.addNew);
	app.post('/admin/post/publish', User.signinRequired, User.adminRequired, Post.publish);

	app.get('/admin/posts', User.signinRequired, User.adminRequired, Post.edit)
	app.post('/admin/post/update', User.signinRequired, User.adminRequired, Post.update);


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