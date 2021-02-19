const path = require('path');
const Multer = require('koa-multer');
const Jimp = require('jimp');

const { AVATAR_PATH, PICTURE_PATH } = require('../constance/file-path');
const avaterUpload = Multer({
	dest: AVATAR_PATH,
});
const avatarHandler = avaterUpload.single('avatar');

const pictureUpload = Multer({
	dest: PICTURE_PATH,
});
const pictureHandler = pictureUpload.array('picture', 9);
const pictureResize = async (ctx, next) => {
	const files = ctx.req.files;
	//对图像进行处理
	for (let file of files) {
		const destPath = path.join(file.destination, file.filename);
		Jimp.read(file.path).then((image) => {
			image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
			image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
			image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
		});
	}
	await next();
};
module.exports = {
	avatarHandler,
	pictureHandler,
	pictureResize,
};
