const DB = require('../app/database1');
class PlayersService {
	async getList(playername) {
		const statement = {};
		// const result = await DB.find('palyers', {});
		// console.log(result, 'result in userservice1');

		const result = await DB.aggregate('palyers', 'teams', playername);
		// console.log(result, 'result in userservice1');
		return result;
	}
}
module.exports = new PlayersService();
