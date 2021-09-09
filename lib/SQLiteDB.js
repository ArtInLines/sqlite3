const DB = require('better-sqlite3');

// TODO: Add better documentation of the underlying `better-sqlite3` framework, which is currently missing from the code itself

/**
 * @typedef {Object} RunResult
 * @property {Number} changes the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
 * @property {Number} lastInsertRowid the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
 */

/**
 * @callback runStmt
 * @param {...any} bindParams Any parameters to bind to the statement. Is optional.
 * @returns {RunResult}
 */

/**
 * @typedef column
 * @property {String} name Name or alias of the result column
 * @property {?String} column The name of the originating table column or `null` if it's an expression or subquery
 * @property {?String} table The name of the originating table or `null` if it's an expression or subquery
 * @property {?String} database The name of the originating database or `null` if it's an expression or subquery
 * @property {?String} type The name of the declared type, or null if it's an expression or subquery.
 */

/**
 * @callback getColumns
 * @returns {column[]}
 */

/**
 * @typedef	{Object} Statement
 * @property {import('better-sqlite3').Database} database The parent database object
 * @property {String} source The source string that was used to create the prepared statement
 * @property {Boolean} reader Whether the prepared statement returns data
 * @property {Boolean} readonly Whether the prepared statement is readonly
 * @property {runStmt} run Executes the prepared statement.
 * @property {Function} get Gets the first row retrieved by the query. The returned Object's keys represent the column names. If no data is retrieved `undefined` is returned
 * @property {Function} all Gets all rows retrieved by the query. If no data is found, an empty array is returned.
 * @property {Function} iterate Similar to `all()` but instead returns an iterator. If all rows should be retrieved anyways, `all()` is recommended.
 * @property {Function} pluck Causes the prepared statement to only return the value of the first column of any rows that it retrieves rahter than the entire row object. Can be toggled on/off by inputting the corresponding Boolean value
 * @property {Function} expand Causes the prepared statement to return data namespaced by table. Each key in a row object will be a table name, and each corresponding value will be a nested object that contains the associated column data. This is useful when performing a JOIN between two tables that have overlapping column names. If a result column is an expression or subquery, it will be available within the special $ namespace. Can be toggled on/off by inputting the corresponding Boolean value
 * @property {Function} raw Causes the prepared statement to return rows as arrays instead of objects. This is primarily used as a performance optimization when retrieving a very high number of rows. Column names can be recovered by using the .columns() method. Can be toggled on/off by inputting the corresponding Boolean value
 * @property {getColumns} columns This method is primarily used in conjunction with raw mode. It returns an array of objects, where each object describes a result column of the prepared statement.
 * @property {Function} bind Binds the given parameters to the statement permanently. Unlike binding parameters upon execution, these parameters will stay bound to the prepared statement for its entire life. This method is primarily used as a performance optimization when you need to execute the same prepared statement many times with the same bound parameters
 */

/**
 * @callback verboseFunc
 * @param {any} message Message, usually the query sent to the DB
 * @param {...any} additionalArgs
 * @returns {void}
 */

/**
 * @typedef {Object} DB_Options
 * @property {Boolean} [readonly] Whether the DB is readonly. Defaults to `false`
 * @property {Boolean} [fileMustExist] Whether the DB is only created when the DB file exists. Defaults to `false`
 * @property {Number} [timeout] How many milliseconds to wait for any operation to resolve, before throwing an error. Defaults to `5000`
 * @property {?verboseFunc} [verbose] A function to call on every interaction with the DB. Usually takes the query string sent to the DB as first parameter. Defaults to `null`
 * @property {String} [namedBindingPrefix] The Prefix for named bindings. Defaults to `@`
 * @property {Boolean} [bindToStr] Whether `this.bindToQuery` should return a String or a Statement. Defaults to `false`.
 * @property {Boolean} [quoteStr] Indicates whether strings should be quoted or not. Defaults to `this.defualtOpts.qutoeStr`.
 * @property {Boolean} [WAL_Mode] Indicates whether to activate WAL mode. It is recommended for performance increases in concurrent applications (e.g. web applications). However, there may be some issues with transactions involving attached databases and when using several concurrent threads, WAL mode may cause "Checkpoint starvation". Defaults to `false`. This setting can be changed at any point by executing `this.pragma('journal_mode = WAL')`
 * @property {Boolean} [foreignKeys] Indicates whether foreign Keys are allowed in databases. Defaults to `true`. This setting can be changed at any point by executing `this.pragma('foreign_keys = OFF')`
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
	WAL_Mode: false,
	foreignKeys: true,
};

/** Represents a single SQLite DB */
class SQLiteDB extends DB {
	/**
	 * @param {String} filename Name/Path of the DB file. If set to ':memory:', an in-memory DB will be created
	 * @param {DB_Options} opts Options for creating the DB instance
	 */
	constructor(filename, opts) {
		opts = { ...DEFAULT_OPTS, ...opts };
		super(filename, opts);
		this.defaultOpts = {
			namedBindingPrefix: opts.namedBindingPrefix || '@',
			bindToStr: opts.bindToStr,
			quoteStr: opts.quoteStr,
		};
		if (opts.WAL_Mode) this.pragma('journal_mode = WAL');
		if (opts.foreignKeys) this.pragma('foreign_keys = ON');
	}
}
SQLiteDB.prototype.select = require('./methods/select');
SQLiteDB.prototype.insert = require('./methods/insert');
SQLiteDB.prototype.replace = require('./methods/replace');
SQLiteDB.prototype.update = require('./methods/update');
SQLiteDB.prototype.delete = require('./methods/delete');

SQLiteDB.prototype.createTable = require('./methods/createTable');
SQLiteDB.prototype.deleteTable = require('./methods/deleteTable');

SQLiteDB.prototype.schema = require('./methods/getSchema');
SQLiteDB.prototype.tables = require('./methods/getTables');
SQLiteDB.prototype.tableNames = require('./methods/getTableNames');

SQLiteDB.prototype.bindToQuery = require('./methods/bind');

// SQLiteDB.prototype.getStrForBindings = require('./util/getStrForBindings');

module.exports = SQLiteDB;
