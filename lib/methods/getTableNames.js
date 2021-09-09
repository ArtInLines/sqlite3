/**
 * Gets a list of all tables' names from the DB
 * @param {Boolean} temp Indicates whether to get temporary or permament tables. Defaults to `false` (i.e. permament tables)
 * @returns {String[]} List of table names
 */
function getTableNames(temp = false) {
	let masterTable = temp ? 'sqlite_temp_master' : 'sqlite_master';
	return this.prepare(`SELECT name FROM ${masterTable} WHERE type = 'table'`).raw(true).all().flat();
}

module.exports = getTableNames;
