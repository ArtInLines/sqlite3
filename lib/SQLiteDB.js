const DB = require('better-sqlite3');

/**
 * @callback verboseFunc
 * @param {any} message Message, usually the query sent to the DB
 * @param {...any} additionalArgs
 * @returns {void}
 */

/**
 * @typedef {Object} DB_Options
 * @property {Boolean} [readonly]
 * @property {Boolean} [fileMustExist]
 * @property {Number} [timeout]
 * @property {?verboseFunc} [verbose]
 * @property {String} [namedBindingPrefix] The Prefix for named bindings. Defaults to `@`
 * @property {Boolean} [bindToStr] Whether `this.bindToQuery` should return a String or a Statement. Defaults to `false`.
 * @property {Boolean} [quoteStr] Indicates whether strings should be quoted or not. Defaults to `this.defualtOpts.qutoeStr`.
 */

/** @type {DB_Options} */
const DEFAULT_OPTS = {
	readonly: false,
	fileMustExist: false,
	timeout: 5000,
	verbose: null,
	namedBindingPrefix: '@',
	bindToStr: false,
	quoteStr: false,
};

/** Represents a single SQLite DB */
class SQLiteDB extends DB {
	/**
	 * @param {String} filename
	 * @param {DB_Options} opts
	 * @param {String} namedBindingPrefix
	 */
	constructor(filename, opts) {
		opts = { ...DEFAULT_OPTS, ...opts };
		super(filename, opts);
		this.defaultOpts = {
			namedBindingPrefix: opts.namedBindingPrefix || '@',
			bindToStr: opts.bindToStr,
			quoteStr: opts.quoteStr,
		};
	}
}
SQLiteDB.prototype.select = require('./methods/select');
SQLiteDB.prototype.insert = require('./methods/insert');
SQLiteDB.prototype.replace = require('./methods/replace');
SQLiteDB.prototype.update = require('./methods/update');
SQLiteDB.prototype.delete = require('./methods/delete');

SQLiteDB.prototype.createTable = require('./methods/createTable');
SQLiteDB.prototype.deleteTable = require('./methods/deleteTable');

SQLiteDB.prototype.tables = require('./methods/getTables');
SQLiteDB.prototype.tableNames = require('./methods/getTableNames');

SQLiteDB.prototype.bindToQuery = require('./methods/bind');

// SQLiteDB.prototype.getStrForBindings = require('./util/getStrForBindings');

module.exports = SQLiteDB;
