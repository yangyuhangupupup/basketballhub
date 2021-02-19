const { getList } = require('../service/players.service.js');
class PlayerController {
	async getplayerlist(ctx, next) {
		const { playername } = ctx.request.query;

		const result = await getList(playername);
		//console.log(result);
		// console.log(playername);
		ctx.body = result;
	}
}
module.exports = new PlayerController();
