const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const PRIVITE_KEY = fs.readFileSync(
	path.resolve(__dirname, './keys/private.key')
);
const PUBLIC_KEY = fs.readFileSync(
	path.resolve(__dirname, './keys/public.key')
);
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'basketballhub';
module.exports = {
	APP_PORT,
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD,
	APP_HOST,
} = process.env;
module.exports.PRIVITE_KEY = PRIVITE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.dbName = dbName;
module.exports.dbUrl = dbUrl;
