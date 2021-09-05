const reduceArr = require('../util/reduceArr');
const reduceSet = require('../util/reduceSet');
const valToStr = require('../util/valToSQLiteStr');

/**
 * @typedef {('SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION' | 'CASCADE')} foreignKeyAction
 */

/**
 * @typedef {Object} ForeignKeyOpts
 * @property {String} key Name of the key in this table
 * @property {String} foreignTable Name of the referenced table
 * @property {?String} foreignKey Name of the key in the foreign table. Defaults to `key`.
 * @property {foreignKeyAction} onUpdate What action should the key take when the parent key is updated
 * @property {foreignKeyAction} onDelete What action should the key take when the parent key is deleted
 */

/**
 * @typedef {Object} tableConstraints
 * @property {?String[]} unique List of columns, that have the unique property.
 * @property {?String[]} primaryKey List of columns, that are primary keys.
 * @property {?ForeignKeyOpts[]} foreignKey List of Foreign Keys. Foreign Keys specified in the same column take precedence.
 * @property {?String[]} check Check expressions that hsve to be true, each time a row is added to this table.
 */

/**
 * @typedef {Object} columnOpts
 * @property {String} name Name of the column
 * @property {('TEXT' | 'REAL' | 'BLOB' | 'INTEGER')} type The data type of the column. For JS numbers "REAL" is prefered over "INTEGER"
 * @property {Boolean} notNull Indicates whether the `NULL` is allowed in this column. This is automatically enabled, if `primaryKey` is enabled
 * @property {Boolean} autoincrement Indicates whether this column should increment automatically for each entry. It is recommended to only enable `autoincrement` if completely necessary
 * @property {*} default A default value for this column
 * @property {Boolean} primaryKey Indicates whether this column is a Primary Key. You are allowed to set this to true for several columns, unlike in usual SQLite3.
 * @property {Boolean} unique Indicates whether entries in this column have to be unique.
 * @property {ForeignKeyOpts} foreignKey List of Foreign Keys. Foreign Keys specified in the same column take precedence.
 * @property {?String} check expression to check for each entry to this column. Check needs to return true, for the column to be inserted
 */

/**
 * @typedef {Object} createTableOpts
 * @property {String} name Name of the table
 * @property {Boolean} ifNotExists Indicates whether to to only create the table if it doesn't already exists in the DB. An error is thrown, if this is set to `false` and the table already exists. Defaults to `true`.
 * @property {?String} schemaName The name of the schema, to which the table belongs. Defaults to `null`.
 * @property {Boolean} withoutRowID Whether the table should have an id row or not. Defaults to `false`.
 * @property {(columnOpts[] | String[])} cols List of columns.
 * @property {?tableConstraints} tableChecks Table constraints
 * @property {foreignKeyAction} onUpdateDefaultAction
 * @property {foreignKeyAction} onDeleteDefaultAction
 */

/** @type {createTableOpts} */
/* const defaultOpts = {
	name: null,
	ifNotExists: true,
	schemaName: null,
	withoutRowID: false,
	cols: [],
	tableChecks: null,
	onUpdateDefaultAction: 'CASCADE',
	onDeleteDefaultAction: 'CASCADE',
}; */

/**
 * Create a table
 * @param {createTableOpts} opts
 */
function createTable({ name, ifNotExists = true, schemaName = null, withoutRowID = false, cols = [], tableChecks = {}, onUpdateDefaultAction = 'CASCADE', onDeleteDefaultAction = 'CASCADE' }) {
	let sql = `CREATE TABLE `;
	if (ifNotExists) sql += 'IF NOT EXISTS ';
	if (schemaName) sql += `${schemaName}.`;
	sql += name + '(';

	// Update tableChecks
	tableChecks.foreignKey = new Map(tableChecks?.foreignKey?.map((fKey) => [fKey.key, fKey]));
	tableChecks.primaryKey = new Set(tableChecks?.primaryKey);
	tableChecks.unique = new Set(tableChecks?.unique);

	/** @param {(String | columnOpts)} col */
	const reduceCB = (col) => {
		if (typeof col === 'string') return col;

		// col is an Object
		if (col.foreignKey) tableChecks.foreignKey.set(col.name, { ...col.foreignKey, ...{ key: col.name } });
		if (col.primaryKey) tableChecks.primaryKey.add(col.name);
		if (col.unique) tableChecks.unique.add(col.name);

		let str = ` ${col.name}`;
		if (col.type) str += ` ${col.type.toUpperCase()}`;
		if (col.notNull || col.primaryKey) str += ` NOT NULL`;
		if (col.default) str += ` DEFAULT ${valToStr(col.default, true)}`;
		if (col.check) str += ` CHECK (${col.check})`;
		return str;
	};

	sql += reduceArr(cols, reduceCB, (total, current) => total + ',' + reduceCB(current));

	const reduceSetCB = (total, val) => total + ',' + val;
	if (tableChecks.unique?.size > 0) sql += `, UNIQUE (${reduceSet(tableChecks.unique, reduceSetCB)})`;
	if (tableChecks.check?.length > 0) tableChecks.check.forEach((check) => (sql += `, CHECK (${check})`));
	if (tableChecks.primaryKey?.size > 0) sql += `, PRIMARY KEY (${reduceSet(tableChecks.primaryKey, reduceSetCB)})`;
	if (tableChecks.foreignKey?.size > 0) {
		tableChecks.foreignKey.forEach((fKey) => {
			sql += `, FOREIGN KEY (${fKey.key}) REFERENCES ${fKey.foreignTable} (${fKey.foreignKey || fKey.key})`;
			sql += ` ON UPDATE ${fKey.onUpdate ? fKey.onUpdate : onUpdateDefaultAction}`;
			sql += ` ON DELETE ${fKey.onDelete ? fKey.onDelete : onDeleteDefaultAction}`;
		});
	}

	sql += `)`;
	if (withoutRowID) sql += ' WITHOUT ROWID';

	return this.prepare(sql).run();
}

module.exports = createTable;
