'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
	src: String,
	filename: {
		unique: true,
		type: String
	},
	originalname: String,
	size: String,
	mimetype: String,
	wider: Boolean,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

PhotoSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}

	next();
})

module.exports = mongoose.model('Photo', PhotoSchema);