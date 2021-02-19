const Router = require('koa-router');
const playersRouter = new Router({ prefix: '/players' });
const { getplayerlist } = require('../controller/player.controller');
const { checkauth } = require('../middleware/auth.middleware');

playersRouter.get('/', checkauth, getplayerlist);

module.exports = playersRouter;
