const Photo = require('../models/photo');
const config = require('../config/config');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));

exports.library = async function(req, res) {
	const pageTitle = config.edit.title;
	const username = req.session.user.name;

	const photos = await Photo.find({}).exec();

	if (photos.length > 0) {
		res.render('all-photos', {
			title: pageTitle,
			name: username,
			photos: photos
		})
	}
	else {
		console.log('图片查询失败')
		res.render('all-photos', {
			title: pageTitle,
			name: username,
			photos: []
		})
	}
}

exports.upload = function(req, res) {
	const file = req.file;
	

	if (file) {
		let wider = true;
		const path = file.destination + file.filename;

		console.log('path' + path);

		sizeOf(path)
			.then(dimensions => {
				if (dimensions.width > dimensions.height) {
					wider = true;
				}
				else {
					wider = false;
				}
			})
			.catch(err => console.log(err));


		const photo = new Photo({
			src: '/image/' + file.filename,
			filename: file.filename,
			mimetype: file.mimetype,
			originalname: file.originalname,
			size: file.size,
			wider: wider
		})

		photo.save(function(err, photo) {
			if (err) return console.log(err);
			console.log('图片保存成功')
		})
	}
	else {
		console.log('上传出错')
		console.log(file)
	}

	return res.redirect('/admin/photo/library')
}