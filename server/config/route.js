const Admin = require('../controllers/admin');

module.exports = function(app) {
	
	app.get('/admin', Admin.page);


	app.post('/publish', Admin.publish);

	app.get('/getDocs', Admin.getDocs);

	app.get('/getCategories', Admin.getCategories);

}