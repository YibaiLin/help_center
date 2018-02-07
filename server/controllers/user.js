'use strict'

const User = require('../models/user');
const config = require('../config/config');

exports.showSignup = function(req, res){
	const title = config.signup.title;

    res.render('signup', {
        title: title
    })
}

exports.showSignin = function(req, res){
	const title = config.signin.title;
	console.log('signin showpage sid: ' + req.sessionID)

    res.render('signin', {
        title: title
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

		if (_user.password !== _user.confirmPwd) {
			console.log('两次密码不一样')
			return res.redirect('/signup')
		}

		// 移除 cofirmPwd 属性
		delete _user.confirmPwd;
		
		let user1 = new User(_user) ;
		user1.save((err, user) => {
			if (err) return console.log(err);
			req.session.user = user;
			res.redirect('/admin/dashboard');
		})
	})
}

exports.signin = function(req, res) {
	let _user = Object.assign({}, req.body);
	let name = _user.name;
	let password = _user.password;

	console.log('signin sid: ' + req.sessionID)

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
				return res.redirect('/admin/dashboard');
			}

			return res.redirect('http://localhost:3000')

		})
	})

}

//logout
exports.logout = function (req, res) {
    delete req.session.user;

    res.redirect('http://localhost:3000')
}

exports.signinRequired = function(req, res, next) {
	let user = req.session.user;

	if (!user) {
		return res.redirect('/signin')
	}
	
	next();
}

exports.adminRequired = function(req, res, next){
    let user = req.session.user

    if(user.role < 10) {
        return res.redirect('http://localhost:3000')
    }
    next()
}

exports.verifyLogin = function(req, res) {
	let user = req.session.user;

	console.log('checkLogin: ' + user)
	console.log('verifyLogin sid: ' + req.sessionID)

	if (!user) {
		return res.send({
			success: false,
			msg: '用户未登录'
		})
	}
	return res.send({
			success: true,
			data: user
		})
}