const DB = require('better-sqlite3');

/** Represents a single SQLite DB */
class SQLiteDB {
	/**
	 * @param {String} filename
	 * @param {DB.Options} opts
	 */
	constructor(filename, opts) {
		this.db = new DB(filename, opts);
	}
}

SQLiteDB.prototype.createQuery = require('./createQuery');
SQLiteDB.prototype.insert = require('./insert');

module.exports = SQLiteDB;
