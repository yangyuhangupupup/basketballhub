const fs = require('fs');
const { create } = require('../service/user.service');
// const { getAvatarByUserId } = require('../service/file.service');
const { AVATAR_PATH } = require('../constance/file-path');
class UserController {
	async create(ctx, next) {
		const user = ctx.request.body;
		const { result } = await create(user);
		ctx.body = {
			message: '创建用户成功',
			result,
			status: 400,
		};
	}
	// async avatarInfo(ctx, next) {
	// 	const { userId } = ctx.params;
	// 	const result = await getAvatarByUserId(userId);
	// 	ctx.response.set('content-type', result.mimetype);
	// 	ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
	// }
}
module.exports = new UserController();
