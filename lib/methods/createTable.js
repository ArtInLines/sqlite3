/**
 * @typedef {Object} tableConstraints
 * @property {?String[]} unique List of columns, that should have the unique property
 * @property {}
 */

/**
 * @typedef {Object} createTableOpts
 * @property {Boolean} ifNotExists Indicates whether to to only create the table if it doesn't already exists in the DB. An error is thrown, if this is set to `false` and the table already exists. Defaults to `true`.
 * @property {?String} schemaName The name of the schema, to which the table belongs. Defaults to `null`.
 * @property {Boolean} withoutRowID Whether the table should have an id row or not. Defaults to `false`.
 * @property {tableConstraints} tableConstraints
 */

/** @type {createTableOpts} */
const defaultOpts = {
	ifNotExists: true,
	schemaName: null,
	withoutRowID: false,
};

/**
 * Create a table
 * @param {createTableOpts} opts
 */
function createTable(opts = defaultOpts) {}

module.exports = createTable;
