export = replace;
/**
 * Replace rows in the DB
 * Replacing values means to either insert them (if the key doesn't exist in the table yet) or replace them. Replacing is different from updating, in that replacing means the row will be deleted and then newly inserted. Any other values associated with the row, that aren't specified in the replace function, will be lost.
 * @param {String} table Table name
 * @param {?(String | String[])} [columnList] List of columns of the table. If set to `null`, `columnList` will not be added to the Query, meaning all columns are selected in the same order that they were inserted. Defaults to `null`.
 * @param {(String[] | String[][])} values The values - in order - to replace into the table. If several rows are to be replaced into the DB, values has to be a two-dimensional array.
 * @returns {import("../SQLiteDB").RunResult}
 */
declare function replace(table: string, columnList?: (string | string[]) | null, ...values: (string[] | string[][])): import("../SQLiteDB").RunResult;
