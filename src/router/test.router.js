const Router = require('koa-router');
const testRouter = new Router({ prefix: '/tests' });

testRouter.get('/', async (ctx, next) => {
	await ctx.render('index');
});
module.exports = testRouter;
