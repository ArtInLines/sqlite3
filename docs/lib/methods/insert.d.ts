export = insert;
/**
 * Insert rows into a table
 * @param {String} table Table name
 * @param {?(String | String[])} [columnList] List of columns of the table. If set to `null`, `columnList` will not be added to the Query. Defaults to `null`.
 * @param {(String[] | String[][])} values The values - in order - to insert into the table. If empty, DEFAULT VALUES will be inserted. If several rows are to be inserted, values has to be a two-dimensional array.
 * @returns {import("../SQLiteDB").RunResult}
 */
declare function insert(table: string, columnList?: (string | string[]) | null, ...values: (string[] | string[][])): import("../SQLiteDB").RunResult;
