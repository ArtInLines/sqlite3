export = getTables;
/**
 * Gets a list of all tables from the DB. Set the last value to `true` if you want to get all temporal tables.
 * @param {String[]} cols The List of columns to retrieve for each table. Defaults to `['name', 'sql']`. Possible values are `name` (Name of the Table), `sql` (Create table query), `type` ("table"), `tbl_name` (same as name), `rootpage` (number of the root b-tree page)
 * @param {Object[]} List of table objects with the properties, specified in `cols`
 */
declare function getTables(...cols: string[]): any;
