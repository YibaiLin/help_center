'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,

	// 1 普通访客，注册可评论
	// 10 文章编辑员
	// >100 超级管理员
	role: {
		type: Number,
		default: 1
	},


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

UserSchema.pre('save', function(next) {
	let user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}

	bcrypt.hash(user.password, saltRounds, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	})
})

UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		})
	}
}

UserSchema.static = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.find({_id: id})
			.exec(cb)
	}
}



module.exports = mongoose.model('User', UserSchema);