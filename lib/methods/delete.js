const valToStr = require('../util/valToSQLiteStr');

/**
 * Delete `limit` amount of rows of the table `table` after `filterCondition`, `orderBy` and `offset` were applied to the table.
 * @param {Object} o
 * @param {String} o.table Name of the table
 * @param {String} o.filterCondition Filters the rows with `WHERE filterCondition`
 * @param {String} o.orderBy Order By expression
 * @param {Number} o.limit Max amount of rows to delete
 * @param {Number} o.offset Offset amount
 * @returns {import('../SQLiteDB').RunResult}
 */
function remove({ table, filterCondition, orderBy, limit, offset }) {
	let sql = `DELETE FROM ${table}`;
	if (filterCondition) sql += ` WHERE ${filterCondition}`;
	if (orderBy) sql += ` ORDER BY ${orderBy}`;
	if (limit) sql += ` LIMIT ${valToStr(Number(limit))}`;
	if (offset) sql += ` OFFSET ${valToStr(Number(offset))}`;
	return this.prepare(sql).run();
}

module.exports = remove;
