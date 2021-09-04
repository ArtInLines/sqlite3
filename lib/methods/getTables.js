/**
 * Gets a list of all tables' names from the DB
 * @param {Boolean} temp Indicates whether to get temporary or permament tables. Defaults to `false` (i.e. permament tables)
 */
function getTables(temp = false) {
	let masterTable = temp ? 'sqlite_temp_master' : 'sqlite_master';
	return this.prepare(`SELECT name FROM sqlite_master WHERE type = 'table'`).all();
}

module.exports = getTables;
