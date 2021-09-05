/**
 * Replace rows in the DB
 * Replacing values means to either insert them (if the key doesn't exist in the table yet) or replace them. Replacing is different from updating, in that replacing means the row will be deleted and then newly inserted. Any other values associated with the row, that aren't specified in the replace function, will be lost.
 * @param {String} table Table name
 * @param {?(String | String[])} [columnList] List of columns of the table. If set to `null`, `columnList` will not be added to the Query, meaning all columns are selected in the same order that they were inserted. Defaults to `null`.
 * @param {(String[] | String[][])} [values] The values - in order - to replace into the table. If several rows are to be replaced into the DB, values has to be a two-dimensional array.
 * @returns {import('better-sqlite3').RunResult}
 */
function replace(table, columnList = null, ...values) {
	let sql = `REPLACE INTO ${table}`;
	if (columnList) {
		if (Array.isArray(columnList)) columnList = columnList.join(',');
		sql += ` (${columnList})`;
	}

	sql += ' VALUES';
	if (!Array.isArray(values[0])) values = [values];
	else if (values.length === 1 && Array.isArray(values[0][0])) values = values[0];
	const rowAmount = values.length;
	const colAmount = values[0].length;
	for (let i = 0; i < rowAmount; i++) {
		if (i === 0) sql += ' (';
		else sql += ',(';
		for (let j = 0; j < colAmount; j++) {
			if (j === 0) sql += '?';
			else sql += ',?';
		}
		sql += ')';
	}

	let stmt = this.prepare(sql);
	stmt = values ? stmt.bind(values.flat()) : stmt;
	return stmt.run();
}

module.exports = replace;
