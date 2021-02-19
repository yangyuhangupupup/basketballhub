const {
	NAME_OR_PASSWORD_IS_REQUIRED,
	USER_ALREADY_EXISTS,
} = require('../constance/error-types');
const { getUserByName } = require('../service/user.service');
const { md5pasword } = require('../utils/password-handle');
const checkuser = async (ctx, next) => {
	//1.获取用户名和密码
	const { name, password } = ctx.request.body;
	//2.判断用户名或者密码不能空
	if (!name || !password || name === '' || password === '') {
		const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
		return ctx.app.emit('error', error, ctx);
	}
	const result = await getUserByName(name);
	console.log(result, 'result in usermiddleware');
	if (result.length !== 0) {
		const error = new Error(USER_ALREADY_EXISTS);
		return ctx.app.emit('error', error, ctx);
	}
	await next();
};

const handlePassword = async (ctx, next) => {
	let { password } = ctx.request.body;
	ctx.request.body.password = md5pasword(password);
	await next();
};

module.exports = {
	checkuser,
	handlePassword,
};
