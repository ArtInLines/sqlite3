const valToStr = require('../util/valToSQLiteStr');

/**
 * Update specified columns of every/specified rows in a table
 * @param {String} table Name of the table
 * @param {String[][]} colValMap 2D Array mapping each column to a value. `[['col1', val1], ['col2', val2]]`
 * @param {?String} [filterCondition] Where-Filter expression
 * @param {?String} [orderBy] Order by expression
 * @param {?Number} [limit] Max amount of rows to update. If set to `null` all rows of the table will be updated
 * @param {?Number} [offset] The number by which to offset the result, meaning the result will omit the first `n` rows. If set to `null` no rows are omitted. Defaults to `null`
 * @param {Boolean} [quoteStr] Indicates whether to put quotes around strings. Defaults to `true`. Only disable this, if you already transformed JS values into strings.
 * @returns {import('../SQLiteDB').RunResult}
 */
function update(table, colValMap, filterCondition, orderBy, limit, offset, quoteStr = true) {
	let sql = `UPDATE ${table} SET`;
	if (!Array.isArray(colValMap[0])) colValMap = [colValMap];
	colValMap.forEach((arr) => (sql += ` ${arr[0]} = ${valToStr(arr[1], quoteStr)},`));
	sql = sql.slice(0, sql.length - 1); // Remove unnecessary comma, that was added in the loop before
	if (filterCondition) sql += ` WHERE ${filterCondition}`;
	if (orderBy) sql += ` ORDER BY ${orderBy}`;
	if (limit) sql += ` LIMIT ${typeof limit === 'string' ? limit : valToStr(limit)}`;
	if (offset) sql += ` OFFSET ${typeof offset === 'string' ? offset : valToStr(offset)}`;

	console.log({ sql });
	return this.prepare(sql).run();
}

module.exports = update;
