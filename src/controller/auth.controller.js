const jwt = require('jsonwebtoken');
const { PRIVITE_KEY } = require('../app/config');
// const login = (ctx, next) => {
// 	const { name } = ctx.request.body;
// 	ctx.body = `你好登陸人${name},新年快樂`;
// 	next();
// };

// module.exports = {
// 	login,
// };

class AuthController {
	async login(ctx, next) {
		const { _id, username } = ctx.user;
		const token = jwt.sign({ _id, username }, PRIVITE_KEY, {
			expiresIn: 60 * 60 * 24,
			algorithm: 'RS256',
		});
		ctx.body = {
			id: _id,
			username,
			token,
		};
		//await next();
	}
	async success(ctx, next) {
		ctx.body = '用户授权成功';
	}
}
module.exports = new AuthController();
