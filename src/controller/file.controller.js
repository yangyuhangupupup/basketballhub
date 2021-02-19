const { APP_HOST, APP_PORT } = require('../app/config');
const { updateAvatarUrlById } = require('../service/user.service');
class FileController {
	async saveAvatarInfo(ctx, next) {
		//1.获取图像信息
		const { mimetype, filename, size } = ctx.req.file;
		const { id } = ctx.user;
		//2.将图像信息数据保存到数据库中
		const result = await service.createAvatar(filename, mimetype, size, id);
		const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
		// console.log(avatarUrl);
		await updateAvatarUrlById(id, avatarUrl);
		ctx.body = result;
	}
	async savepictureInfo(ctx, next) {
		const files = ctx.req.files;
		const { id } = ctx.user;
		const { momentId } = ctx.query;
		//将所有文件信息保存到数据库中
		for (let file of files) {
			const { filename, mimetype, size } = file;
			await service.createFile(filename, mimetype, size, id, momentId);
		}
		ctx.body = '动态配图上传完成';
	}
}
module.exports = new FileController();
