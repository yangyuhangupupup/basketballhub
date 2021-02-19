const DB = require('../app/database1');
class UserService {
	async create(user) {
		const { name, password } = user;
		const statement = { username: name, password };
		const result = DB.insert('user', statement);
		return result;
	}

	async getUserByName(name) {
		const statement = { username: name };
		const result = await DB.find('user', statement);
		console.log(result, 'result in userservice1');
		return result;
	}
	async updateAvatarUrlById(id, avatarUrl) {
		const statement = `update user set avatar_url = ? where id = ?`;
		const [result] = await connection.execute(statement, [avatarUrl, id]);
		return result;
	}
}
module.exports = new UserService();
