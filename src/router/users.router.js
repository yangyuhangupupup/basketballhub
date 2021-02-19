const Router = require('koa-router');
const userRouter = new Router({ prefix: '/users' });

const { checkuser, handlePassword } = require('../middleware/user.middleware');
const { create, avatarInfo } = require('../controller/user.controller');
userRouter.post('/', checkuser, handlePassword, create);
// userRouter.get('/:userId/avatar', avatarInfo);
module.exports = userRouter;
