const {
	NAME_OR_PASSWORD_IS_REQUIRED,
	USER_ALREADY_EXISTS,
	USER_DOES_NOT_EXISTS,
	PASSWORD_IS_INCORRENT,
	UNAUTHORIZATION,
	UNPERMISSION,
} = require('../constance/error-types');
const errorhandle = (err, ctx) => {
	// console.log(err.message, 'errorhandle in ');
	let status, message;
	switch (err.message) {
		case NAME_OR_PASSWORD_IS_REQUIRED:
			status = 400;
			message = '用戶名或者密码不能为空';
			break;
		case USER_ALREADY_EXISTS:
			status = 409;
			message = '用戶名名字已存在';
			break;
		case USER_DOES_NOT_EXISTS:
			status = 400;
			message = '用戶名不存在';
			break;
		case PASSWORD_IS_INCORRENT:
			status = 400;
			message = '密码是错误的~';
			break;
		case UNAUTHORIZATION:
			status = 401;
			message = '无效的token~';
			break;
		case UNPERMISSION:
			status = 401;
			message = '您不具备操作的权限~';
			break;
		default:
			status = 404;
			message = 'not found';
	}
	ctx.status = status;
	ctx.body = {
		message,
		status,
	};
};
module.exports = {
	errorhandle,
};
