export = remove;
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
declare function remove({ table, filterCondition, orderBy, limit, offset }: {
    table: string;
    filterCondition: string;
    orderBy: string;
    limit: number;
    offset: number;
}): import('../SQLiteDB').RunResult;
