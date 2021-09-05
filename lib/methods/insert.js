/**
 * Insert rows into a table
 * @param {String} table Table name
 * @param {?(String | String[])} [columnList] List of columns of the table. If set to `null`, `columnList` will not be added to the Query. Defaults to `null`.
 * @param {(String[] | String[][])} [values] The values - in order - to insert into the table. If empty, DEFAULT VALUES will be inserted. If several rows are to be inserted, values has to be a two-dimensional array.
 * @returns {import("better-sqlite3").RunResult}
 */
function insert(table, columnList = null, ...values) {
	let sql = `INSERT INTO ${table}`;
	if (columnList) {
		if (Array.isArray(columnList)) columnList = columnList.join(',');
		sql += ` (${columnList})`;
	}

	if (values.length <= 0) sql += ' DEFAULT VALUES';
	else {
		sql += ' VALUES';
		if (!Array.isArray(values[0])) values = [values];
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
	}

	let stmt = this.prepare(sql);
	stmt = values ? stmt.bind(values.flat()) : stmt;
	return stmt.run();
}

module.exports = insert;
