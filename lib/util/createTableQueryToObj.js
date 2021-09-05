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
	// TODO: Optimize perfomance
	// (especially with chained operations looping through arrays)

	/** @type {createTableOpts} */
	const obj = {
		name: '',
		cols: [],
		tableChecks: {},
		withoutRowID: false,
		schemaName: null,
		ifNotExists: false,
	};
	schema = schema.trim();
	obj.withoutRowID = /WITHOUT\s+ROWID/.test(schema.slice(schema.lastIndexOf(')') + 1).toUpperCase());
	schema = schema.slice('CREATE TABLE'.length); // Remove 'CREATE TABLE' beginning

	// Get table name & focus on text in parantheses
	let paranthesesIndex = schema.indexOf('(');
	obj.name = schema.slice(0, paranthesesIndex).trim().split(' ');
	if (obj.name.length > 1) {
		console.log(obj.name);
		if (obj.name[0].toUpperCase() === 'IF') obj.name = obj.name.at(-1);
		else throw Error('Invalid "Create Table" Query can\'t be parsed');
	} else obj.name = obj.name[0];
	obj.name = obj.name.split('.');
	if (obj.name.length > 1) {
		obj.schemaName = obj.name[0];
		obj.name = obj.name[1];
	} else obj.name = obj.name[0];

	schema = schema.slice(paranthesesIndex + 1, schema.lastIndexOf(')'));
	schema = schema.split(',');

	// Get columns & table checks
	let i = 0;
	// Iterate through each column
	while (i < schema.length) {
		// Check if we reached the table constraints and if so, break
		const testColBegin = schema[i].toUpperCase().trim();
		if (['PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE', 'CHECK'].find((val) => testColBegin.startsWith(val)) !== undefined) break;

		// Add col object
		// TODO: Increase perfomance, by performing all currently chained array operations in a single loop
		/** @type {columnOpts} */
		const colObj = {};

		const checkStartIndex = schema[i].indexOf('(');
		if (checkStartIndex >= 0) {
			const checkEndIndex = schema[i].lastIndexOf(')');
			if (checkEndIndex >= 0) {
				colObj.check = schema[i].slice(checkStartIndex + 1, checkEndIndex);
				schema[i] = schema[i].slice(0, checkEndIndex) + schema[i].slice(checkEndIndex + 1);
			}
		}

		const colArr = schema[i]
			.toLowerCase()
			.split(' ')
			.filter((val) => val !== '');
		colObj.name = colArr.shift();

		let foundIndex = colArr.findIndex((val) => val === 'default');
		colObj.default = foundIndex >= 0 ? colArr.splice(foundIndex, 2)[1] : undefined;

		foundIndex = colArr.findIndex((val, i, arr) => val === 'not' && arr[i + 1] === 'null');
		colObj.notNull = foundIndex >= 0 && colArr.splice(foundIndex, 2).length === 2;

		foundIndex = colArr.findIndex((val, i, arr) => val === 'primary' && arr[i + 1] === 'key');
		colObj.primaryKey = foundIndex >= 0 && colArr.splice(foundIndex, 2).length === 2;

		colObj.type = ['text', 'blob', 'real', 'integer'].find((val) => colArr.includes(val));
		colObj.autoincrement = colArr.includes('autoincrement');
		colObj.unique = colArr.includes('unique');

		obj.cols.push(colObj);
		i++;
	}
	// Iterate through each table check
	while (i < schema.length) {
		// TODO

		i++;
	}
	return obj;
}

module.exports = schemaToObj;
