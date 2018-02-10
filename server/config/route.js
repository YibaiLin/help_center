const Client = require('../controllers/client');
const Admin = require('../controllers/admin');
const User = require('../controllers/user');
const Post = require('../controllers/post');
const Photo = require('../controllers/photo');
const Category = require('../controllers/category');
const Dev = require('../controllers/developOnly');

const handle404 = require('../controllers/404');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/')
  },
  filename: function (req, file, cb) {
  	let ext = file.mimetype;
  	if (ext.indexOf('+xml') !== -1) {
  		ext = ext.replace('+xml', '');
  	}
  	ext = ext.replace(/.*\//, '.')
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
 
const upload = multer({ storage: storage })

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

	//  api
	app.get('/getDocs', Admin.getDocs);
	app.get('/getCategories', Admin.getCategories);

	app.get('/api/u/verify', User.verifyLogin);

	// 图片上传
	app.get('/admin/photo/library', User.signinRequired, User.adminRequired, Photo.library)

	app.post('/admin/photo/upload', User.signinRequired, User.adminRequired, upload.array('avatar', 12), Photo.upload)



	// User
    app.get('/signup', User.showSignup)
    app.get('/signin', User.showSignin)
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/admin/logout', User.logout)
    // app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)


    // 操作数据库
    app.get('/u/superadmin/mongo/posts/', User.signinRequired, User.adminRequired, Dev.delPost)
    app.get('/u/superadmin/mongo/getPosts', User.signinRequired, User.adminRequired, Dev.getPosts)


	// app.get('*', handle404);
    app.get('/*', Client.index);
}