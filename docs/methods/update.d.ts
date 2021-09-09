export = update;
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
declare function update(table: string, colValMap: string[][], filterCondition?: string | null, orderBy?: string | null, limit?: number | null, offset?: number | null, quoteStr?: boolean): import('../SQLiteDB').RunResult;
