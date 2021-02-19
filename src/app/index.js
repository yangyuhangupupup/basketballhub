const Koa = require('koa');
const path = require('path');
const render = require('koa-art-template');
const app = new Koa();
render(app, {
	root: path.join(__dirname, '../views'),
	extname: '.html',
	debug: process.env.NODE_ENV !== 'production',
});
const bodyParser = require('koa-bodyparser');
const userRouter = require('../router/index');
// const userRouter = require('../router/users.router');
// const AuthRouter = require('../router/auth.router');
const { errorhandle } = require('./err-handle');
app.use(bodyParser());
userRouter(app);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(AuthRouter.routes());
// app.use(AuthRouter.allowedMethods());

app.on('error', errorhandle);
module.exports = app;
