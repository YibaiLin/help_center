const Admin = require('../controllers/admin');
const User = require('../controllers/user');

module.exports = function(app) {
	
	app.get('/admin/dashboard', User.signinRequired, User.adminRequired, Admin.index);
	app.get('/admin/edit', User.signinRequired, User.adminRequired, Admin.page);


	app.post('/publish', Admin.publish);

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