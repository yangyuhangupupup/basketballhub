const Router = require('koa-router');
const { checkauth } = require('../middleware/auth.middleware');
const {
	avatarHandler,
	pictureHandler,
	pictureResize,
} = require('../middleware/file.middleware');
const {
	saveAvatarInfo,
	savepictureInfo,
} = require('../controller/file.controller');
const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avatar', checkauth, avatarHandler, saveAvatarInfo);
fileRouter.post(
	'/picture',
	checkauth,
	pictureHandler,
	pictureResize,
	savepictureInfo
);

module.exports = fileRouter;
