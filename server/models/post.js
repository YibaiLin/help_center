'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	title: {
		unique: true,
		type: String
	},
	path: String,
	content: String,
	author: String,

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

PostSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}

	next();
})

module.exports = mongoose.model('Post', PostSchema);