//连接mongodb数据库

const url = 'mongodb://127.0.0.1:27017';
const dbname = 'basketballhub';
console.time('start');
MongoClient.connect(url, function (err, client) {
	if (err) {
		console.log(err);
		return;
	}

	let db = client.db(dbname);
	db.collection('user').insertOne(
		{ username: 'zhn22', age: 26, sex: '男', status: '1' },
		(err, result) => {
			if (!err) {
				console.log('增加数据成功');
				client.close();
				console.timeEnd('start');
			}
		}
	);
});
