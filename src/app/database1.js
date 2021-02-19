const { MongoClient } = require('mongodb');
const { dbName, dbUrl } = require('./config');
class Db {
	static getInstance() {
		if (!Db.instance) {
			Db.instance = new Db();
		}
		return Db.instance;
	}
	constructor() {
		this.dbClient = ''; //放db对象
		this.connect();
	}
	connect() {
		return new Promise((resolve, reject) => {
			if (!this.dbClient) {
				MongoClient.connect(dbUrl, (err, client) => {
					if (err) {
						reject(err);
					} else {
						let db = client.db(dbName);
						this.dbClient = db;
						resolve(this.dbClient);
					}
				});
			} else {
				resolve(this.dbClient);
			}
		});
	}
	find(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				const result = db.collection(collectionName).find(json);
				result.toArray((err, docs) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(docs);
				});
			});
		});
	}
	//聚合管道
	aggregate(collectionName, collectionName1, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				const result = db.collection(collectionName).aggregate([
					{
						$lookup: {
							from: collectionName1,
							localField: 'team_id',
							foreignField: 'id',
							as: 'teams',
						},
					},
					{
						$project: {
							team_id: 0,
						},
					},
					{ $match: { first_name: { $regex: json } } },
				]);
				result.toArray((err, docs) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(docs);
				});
			});
		});
	}
	//聚合管道
	insert(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).insertOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		});
	}
	update(collectionName, json1, json2) {
		return new Promise((resolve, reject) => {
			this.connect().then((db) => {
				db.collection(collectionName).updateOne(
					json1,
					{
						$set: json2,
					},
					(err, result) => {
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			});
		});
	}
}

module.exports = Db.getInstance();
