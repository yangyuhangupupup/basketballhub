const Router = require('koa-router');
const { login, success } = require('../controller/auth.controller');
const { checklogin, checkauth } = require('../middleware/auth.middleware');
const AuthRouter = new Router();
// AuthRouter.post('/login', login);
AuthRouter.post('/login', checklogin, login);
AuthRouter.get('/test', checkauth, success);
module.exports = AuthRouter;
