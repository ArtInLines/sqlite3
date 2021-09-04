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
 * @property {?String[]} unique List of columns, that have the unique property
 * @property {?String[]} primaryKey List of columns, that are primary keys
 * @property {?ForeignKeyOpts[]} foreignKey
 * @property {?String} check expression to check for each entry to this column. Check needs to return true, for the column to be inserted
 */

/**
 * @typedef {Object} columnOpts
 * @property {String} name Name of the column
 * @property {('TEXT' | 'REAL' | 'BLOB' | 'INTEGER')} type The data type of the column. For JS numbers "REAL" is prefered over "INTEGER"
 * @property {Boolean} notNull Indicates whether the `NULL` is allowed in this column
 * @property {*} default A default value for this column
 * @property {Boolean} primaryKey Indicates whether this column is a Primary Key. You are allowed to set this to true for several columns, unlike in usual SQLite3.
 * @property {Boolean} unique Indicates whether entries in this column have to be unique.
 * @property {ForeignKeyOpts} foreignKey
 * @property {?String} check expression to check for each entry to this column. Check needs to return true, for the column to be inserted
 */

/**
 * @typedef {Object} createTableOpts
 * @property {String} name Name of the table
 * @property {Boolean} ifNotExists Indicates whether to to only create the table if it doesn't already exists in the DB. An error is thrown, if this is set to `false` and the table already exists. Defaults to `true`.
 * @property {?String} schemaName The name of the schema, to which the table belongs. Defaults to `null`.
 * @property {Boolean} withoutRowID Whether the table should have an id row or not. Defaults to `false`.
 * @property {(columnOpts[] | String[])} cols List of columns.
 * @property {?tableConstraints} tableConstraints
 */

/** @type {createTableOpts} */
const defaultOpts = {
	name: null,
	ifNotExists: true,
	schemaName: null,
	withoutRowID: false,
	cols: [],
	tableConstraints: null,
};

/**
 * Create a table
 * @param {createTableOpts} opts
 */
function createTable(opts) {
	opts = { ...defaultOpts, ...opts };

	let sql = `CREATE TABLE `;
	if (opts.ifNotExists) sql += 'IF NOT EXISTS ';
	if (opts.schemaName) sql += `${opts.schemaName}.`;
	sql += opts.name;

	for (let i = 0; i < opts.cols.length; i++) {
		const col = opts.cols[i];
	}
}

module.exports = createTable;
