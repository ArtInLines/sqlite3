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

/**
 * Transform a "Create Table"-Query to a {@link createTableOpts}
 * @param {String} schema "Create Table" Query string
 * @returns {createTableOpts}
 */
function schemaToObj(schema) {
	const obj = {
		name,
		cols,
		tableChecks,
	};
	schema = schema.trim().slice('CREATE TABLE'.length); // Remove 'CREATE TABLE' beginning

	// Get table name & focus on text in parantheses
	let paranthesesIndex = schema.indexOf('(');
	obj.name = schema.slice(0, paranthesesIndex).trim();
	schema = schema.slice(paranthesesIndex + 1, schema.lastIndexOf(')'));
	schema = schema.split(',');

	// Get columns
}

module.exports = schemaToObj;
