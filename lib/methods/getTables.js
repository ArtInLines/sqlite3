/**
 * Gets a list of all tables from the DB. Set the last value to `true` if you want to get all temporal tables.
 * @param {String[]} cols The List of columns to retrieve for each table. Defaults to `['name', 'sql']`. Possible values are `name` (Name of the Table), `sql` (Create table query), `type` ("table"), `tbl_name` (same as name), `rootpage` (number of the root b-tree page)
 */
function getTables(...cols) {
	let masterTable = 'sqlite_master';
	if (typeof cols[cols.length - 1] === 'boolean' && cols.pop()) masterTable = 'sqlite_temp_master';
	if (cols.length === 0) cols = ['name', 'sql']; // Default values
	return this.prepare(`SELECT ${cols.join(',')} FROM ${masterTable} WHERE type = 'table'`).all();
}

module.exports = getTables;
