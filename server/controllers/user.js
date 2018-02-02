'use strict'

const User = require('../models/user');

exports.showSignup = function(req, res){
    res.render('signup', {
        title: '注册页面'
    })
}

exports.showSignin = function(req, res){
    res.render('signin', {
        title: '登录页面'
    })
}


exports.signup = function(req, res) {
	console.log('body is ', req.body)
	let _user = Object.assign({}, req.body);
	console.log('user is ', _user)

	User.findOne({name: _user.name}, (err, user) => {
		if (err) return console.log(err);
		if (user) {
			console.log('用户已存在!');
			return res.redirect('/signin');
		}
		
		let user1 = new User(_user) ;
		user1.save((err, user) => {
			if (err) return console.log(err);
			req.session.user = user;
			res.redirect('/api/dashboard');
		})
	})
}

exports.signin = function(req, res) {
	let _user = req.body.user;
	let name = _user.name;
	let password = _user.password;

	User.findOne({name: name}, function(err, user) {
		if (err) return console.log(err);
		if (!user) {
			console.log('用户未注册！');
			return res.redirect('/signup');
		}

		user.comparePassword(password, function(err, isMatch) {
			if (err) return console.log('密码有误');
			if (!isMatch) {
				console.log('密码有误');
				return res.redirect('/signin');
			}

			console.log('welcome aboard')
			req.session.user = user;

			if (user.role > 1) {
				return redirect('/api/dashboard');
			}

			return redirect('/')

		})
	})

}