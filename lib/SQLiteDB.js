const DB = require('better-sqlite3');

/** Represents a single SQLite DB */
class SQLiteDB {
	/**
	 * @param {String} filename
	 * @param {DB.Options} opts
	 */
	constructor(filename, opts) {
		this.db = new DB(filename, opts);
		this.query;
	}
}

// SQLiteDB.prototype.createQuery = require('./createQuery');
SQLiteDB.prototype.select = require('./methods/select');
SQLiteDB.prototype.insert = require('./methods/insert');
SQLiteDB.prototype.replace = require('./methods/replace');
SQLiteDB.prototype.update = require('./methods/update');
SQLiteDB.prototype.delete = require('./methods/delete');
SQLiteDB.prototype.createTable = require('./methods/createTable');
SQLiteDB.prototype.deleteTable = require('./methods/deleteTable');
SQLiteDB.prototype.tables = require('./methods/getTables');
SQLiteDB.prototype.getStrForBindings = require('./util/getStrForBindings');

module.exports = SQLiteDB;
