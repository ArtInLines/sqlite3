/**
 * Drop a table from the DB
 * @param {String} table Name of the table to remove
 * @param {Object<ifExists: Boolean, schemaName: ?String>} opts Additional options for deleting the table
 * @param {Boolean} opts.ifExists An error is thrown when the table doesn't exist and `ifExists` is set to `false`. Defaults to `true`
 * @param {?String} opts.schemaName Indicates whether the table is part of a specified DB, that is attached to the main DB. Defaults to null
 * @returns {import('../SQLiteDB').RunResult}
 */
function deleteTable(table, opts = { ifExists: true, schemaName: null }) {
	return this.prepare(`DROP TABLE ${opts.ifExists ? 'IF EXISTS' : ''} ${opts.schemaName ? opts.schemaName + '.' : ''}${table}`).run();
}

module.exports = deleteTable;
