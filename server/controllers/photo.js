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

exports.upload = async function(req, res) {
	const files = req.files;

	if (files.length > 0 ) {
		for (var i=0; i < files.length; i++) {
			let file = files[i];
			let wider = true;
			let path = file.destination + file.filename;

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


			let photo = new Photo({
				src: '/image/' + file.filename,
				filename: file.filename,
				mimetype: file.mimetype,
				originalname: file.originalname,
				size: file.size,
				wider: wider
			})

			await photo.save(function(err, photo) {
				if (err) return console.log(err);
				console.log('图片保存成功')
			})
		}

	}
	else {
		console.log('上传出错')
	}

	return res.redirect('/admin/photo/library')
}