const Admin = require('../controllers/admin');

module.exports = function(app) {
	
	app.get('/admin', Admin.page);


	app.post('/post', Admin.edit)

}